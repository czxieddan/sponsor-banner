import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import vm from "node:vm";
import { afterEach, describe, expect, it, vi } from "vitest";

const envKeys = ["PUBLIC_BASE_URL", "SITE_TITLE", "SITE_FOOTER", "SITE_FAVICON_URL"] as const;
const execFileAsync = promisify(execFile);
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const resetRuntime = () => {
  vi.unstubAllEnvs();
  vi.resetModules();
};

const requestPreview = async (env: Partial<Record<(typeof envKeys)[number], string>> = {}) => {
  resetRuntime();

  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value);
  }

  const { app } = await import("../src/app");
  const response = await app.request("/");

  expect(response.status).toBe(200);

  return response.text();
};

const createInput = (value = "") => ({
  value,
  addEventListener: vi.fn()
});

const runPreviewScript = (html: string) => {
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  const configuredBaseUrl = html.match(/<main data-base-url="([^"]*)"/)?.[1] ?? "";

  if (!script) {
    throw new Error("Preview script not found");
  }

  const elements = new Map<string, ReturnType<typeof createInput> & { src?: string }>([
    ["platform", createInput("patreon")],
    ["name", createInput("RHoiScribe")],
    ["mode", createInput("dark")],
    ["width", createInput("1200")],
    ["height", createInput("400")],
    ["radius", createInput("48")],
    ["padding", createInput("48")],
    ["banner", createInput()],
    ["svgUrl", createInput()],
    ["pngUrl", createInput()],
    ["markdown", createInput()],
    ["html", createInput()]
  ]);

  const main = {
    dataset: {
      baseUrl: configuredBaseUrl.replaceAll("&amp;", "&")
    }
  };

  vm.runInNewContext(script, {
    document: {
      getElementById: (id: string) => elements.get(id),
      querySelector: (selector: string) => (selector === "main" ? main : null),
      querySelectorAll: () => []
    },
    location: {
      origin: "http://internal.local"
    },
    navigator: {
      clipboard: {
        writeText: vi.fn()
      }
    },
    setTimeout: vi.fn(),
    URLSearchParams
  });

  return elements;
};

describe("preview page", () => {
  afterEach(() => {
    resetRuntime();
  });

  it("uses PUBLIC_BASE_URL for generated copy links", async () => {
    const html = await requestPreview({
      PUBLIC_BASE_URL: "https://public.example.com/tools/banner/"
    });

    const elements = runPreviewScript(html);

    expect(elements.get("svgUrl")?.value).toBe(
      "https://public.example.com/tools/banner/patreon/RHoiScribe.svg?w=1200&h=400&radius=48&padding=48&theme=dark"
    );
    expect(elements.get("pngUrl")?.value).toBe(
      "https://public.example.com/tools/banner/patreon/RHoiScribe.png?w=1200&h=400&radius=48&padding=48&theme=dark&scale=2"
    );
    expect(elements.get("markdown")?.value).toBe(
      "![](https://public.example.com/tools/banner/patreon/RHoiScribe.svg?w=1200&h=400&radius=48&padding=48&theme=dark)"
    );
  });

  it("renders configured title, footer, and favicon", async () => {
    const html = await requestPreview({
      SITE_TITLE: "Tools <Demo>",
      SITE_FOOTER: "Powered by <Proxy>",
      SITE_FAVICON_URL: "https://cdn.example.com/favicon.svg?theme=light&v=1"
    });

    expect(html).toContain("<title>Tools &lt;Demo&gt;</title>");
    expect(html).toContain("<h1>Tools &lt;Demo&gt;</h1>");
    expect(html).toContain("<footer>Powered by &lt;Proxy&gt;</footer>");
    expect(html).toContain(
      '<link rel="icon" href="https://cdn.example.com/favicon.svg?theme=light&amp;v=1">'
    );
  });

  it("keeps the preview form title and grid structure tidy", async () => {
    const html = await requestPreview({
      SITE_TITLE: "Sponsor Banner"
    });

    expect(html).toContain("<h1>Sponsor Banner</h1>");
    expect(html).not.toContain('class="eyebrow"');
    expect(html).toContain('class="controls-grid"');
    expect(html).toContain('class="field field-wide"');
    expect(html).toContain('class="field field-half"');
  });

  it("serves a configured local favicon file", async () => {
    resetRuntime();
    vi.stubEnv("SITE_FAVICON_URL", "sponsor-banner-logo.svg");

    const { app } = await import("../src/app");
    const previewResponse = await app.request("/");
    const html = await previewResponse.text();
    const faviconResponse = await app.request("/sponsor-banner-logo.svg");
    const faviconBody = await faviconResponse.text();

    expect(html).toContain('<link rel="icon" href="/sponsor-banner-logo.svg">');
    expect(faviconResponse.status).toBe(200);
    expect(faviconResponse.headers.get("content-type")).toContain("image/svg+xml");
    expect(faviconBody).toContain("<svg");
  });

  it("loads preview settings from a .env file", async () => {
    const dir = await mkdtemp(join(tmpdir(), "sponsor-banner-"));
    const childEnv = Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) => !envKeys.includes(key as (typeof envKeys)[number])
      )
    );

    await writeFile(
      join(dir, ".env"),
      [
        "PUBLIC_BASE_URL=https://env.example.com/banner",
        "SITE_TITLE=Env Preview",
        "SITE_FOOTER=Env Footer",
        "SITE_FAVICON_URL=https://cdn.example.com/env.ico"
      ].join("\n")
    );

    try {
      const configUrl = pathToFileURL(join(projectRoot, "src", "config", "defaults.ts")).href;
      const tsxCli = join(projectRoot, "node_modules", "tsx", "dist", "cli.mjs");
      const script = `import(${JSON.stringify(configUrl)}).then(({ serverConfig }) => console.log(JSON.stringify(serverConfig)))`;
      const { stdout } = await execFileAsync(process.execPath, [tsxCli, "-e", script], {
        cwd: dir,
        env: childEnv
      });
      const serverConfig = JSON.parse(stdout.trim()) as Record<string, string | number>;

      expect(serverConfig.publicBaseUrl).toBe("https://env.example.com/banner");
      expect(serverConfig.siteTitle).toBe("Env Preview");
      expect(serverConfig.siteFooter).toBe("Env Footer");
      expect(serverConfig.siteFaviconUrl).toBe("https://cdn.example.com/env.ico");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
