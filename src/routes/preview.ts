import { serverConfig } from "../config/defaults";
import { platformRegistry } from "../themes";
import { escapeHtml } from "../utils/html";

const copyIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="2"></rect><path d="M5 15V7a2 2 0 0 1 2-2h8"></path></svg>`;

const platformOptions = () =>
  platformRegistry
    .list()
    .map((theme) => `<option value="${escapeHtml(theme.id)}">${escapeHtml(theme.label)}</option>`)
    .join("");

const faviconLink = () =>
  serverConfig.siteFaviconHref
    ? `<link rel="icon" href="${escapeHtml(serverConfig.siteFaviconHref)}">`
    : "";

export const previewRoute = () => {
  const baseUrl = escapeHtml(serverConfig.publicBaseUrl);
  const siteTitle = escapeHtml(serverConfig.siteTitle);
  const siteFooter = escapeHtml(serverConfig.siteFooter);
  const favicon = faviconLink();

  return new Response(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${siteTitle}</title>
${favicon}
<style>
:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f6f1e9;
  color: #2b2118;
}
* {
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(180deg, #faf6ef 0%, #efe7dc 100%);
}
button,
input,
select {
  font: inherit;
}
button {
  cursor: pointer;
}
main {
  width: min(1180px, calc(100vw - 40px));
  min-height: calc(100vh - 72px);
  margin: 0 auto;
  padding: 28px 0 18px;
  display: grid;
  grid-template-columns: minmax(320px, 360px) minmax(0, 1fr);
  align-items: start;
  gap: 24px;
}
section {
  min-width: 0;
}
.sidebar {
  display: grid;
  align-content: start;
  gap: 16px;
}
.title-block {
  display: grid;
  gap: 0;
  padding: 2px 2px 0;
}
h1 {
  margin: 0;
  color: #2b2118;
  font-size: 31px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
}
.panel {
  border: 1px solid #d7c7b3;
  border-radius: 8px;
  background: #fffaf2;
  box-shadow: 0 10px 28px rgba(70, 50, 35, 0.08);
}
.controls {
  padding: 16px;
}
.controls-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 12px;
}
.field {
  display: grid;
  min-width: 0;
  gap: 7px;
}
.field-wide {
  grid-column: 1 / -1;
}
.field-half {
  grid-column: span 1;
}
label,
.output span {
  color: #66594d;
  font-size: 12px;
  font-weight: 700;
}
input,
select {
  width: 100%;
  min-width: 0;
  height: 42px;
  border: 1px solid #cdbba7;
  border-radius: 7px;
  background: #fffdf8;
  color: #2b2118;
  padding: 0 11px;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
}
input:focus,
select:focus {
  border-color: #b45d43;
  box-shadow: 0 0 0 3px rgba(180, 93, 67, 0.16);
}
.preview {
  padding: 16px;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 14px;
}
.stage {
  min-height: 282px;
  border: 1px solid #d8cab8;
  border-radius: 8px;
  background: #fffdf8;
  padding: 12px;
  overflow: auto;
}
.stage img {
  display: block;
  width: 100%;
  min-width: 520px;
  height: auto;
  border-radius: 8px;
}
.outputs {
  display: grid;
  gap: 9px;
}
.output {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 40px;
  gap: 8px;
  align-items: center;
}
.output input {
  color: #42362b;
  font-size: 13px;
}
.copy-button {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #8f4634;
  border-radius: 7px;
  background: #2f241c;
  color: #fff9f0;
  transition:
    background 160ms ease,
    transform 160ms ease,
    border-color 160ms ease;
}
.copy-button:hover,
.copy-button:focus-visible {
  background: #b45d43;
  border-color: #b45d43;
}
.copy-button:active {
  transform: translateY(1px);
}
.copy-button svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.copy-button[data-state="copied"] svg {
  display: none;
}
.copy-button[data-state="copied"]::after {
  content: "OK";
  font-size: 12px;
  font-weight: 800;
}
footer {
  width: min(1180px, calc(100vw - 40px));
  min-height: 32px;
  margin: 0 auto;
  color: #76685b;
  font-size: 13px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 880px) {
  main {
    grid-template-columns: 1fr;
    width: min(100vw - 24px, 720px);
  }
  .stage {
    min-height: 180px;
  }
}
@media (max-width: 620px) {
  main {
    width: min(100vw - 20px, 720px);
    padding-top: 20px;
  }
  h1 {
    font-size: 28px;
  }
  .controls-grid {
    grid-template-columns: 1fr;
  }
  .field-half {
    grid-column: 1 / -1;
  }
  .output {
    grid-template-columns: minmax(0, 1fr) 40px;
  }
  .output span {
    grid-column: 1 / -1;
  }
  .stage img {
    min-width: 420px;
  }
}
</style>
</head>
<body>
<main data-base-url="${baseUrl}">
<section class="sidebar">
<div class="title-block">
<h1>${siteTitle}</h1>
</div>
<div class="panel controls">
<div class="controls-grid">
<div class="field field-wide"><label for="platform">Platform</label><select id="platform">${platformOptions()}</select></div>
<div class="field field-wide"><label for="name">Name</label><input id="name" value="RHoiScribe"></div>
<div class="field field-wide"><label for="mode">Theme</label><select id="mode"><option value="light">Light</option><option value="dark">Dark</option></select></div>
<div class="field field-half"><label for="width">Width</label><input id="width" type="number" min="320" max="4096" value="1200"></div>
<div class="field field-half"><label for="height">Height</label><input id="height" type="number" min="120" max="2048" value="400"></div>
<div class="field field-half"><label for="radius">Radius</label><input id="radius" type="number" min="0" max="240" value="48"></div>
<div class="field field-half"><label for="padding">Padding</label><input id="padding" type="number" min="16" max="240" value="48"></div>
</div>
</div>
</section>
<section class="panel preview">
<div class="stage"><img id="banner" alt="Sponsor banner preview"></div>
<div class="outputs">
<div class="output"><span>SVG URL</span><input id="svgUrl" readonly><button class="copy-button" data-copy="svgUrl" title="Copy SVG URL" aria-label="Copy SVG URL">${copyIcon}<span class="sr-only">Copy SVG URL</span></button></div>
<div class="output"><span>PNG URL</span><input id="pngUrl" readonly><button class="copy-button" data-copy="pngUrl" title="Copy PNG URL" aria-label="Copy PNG URL">${copyIcon}<span class="sr-only">Copy PNG URL</span></button></div>
<div class="output"><span>Markdown</span><input id="markdown" readonly><button class="copy-button" data-copy="markdown" title="Copy Markdown" aria-label="Copy Markdown">${copyIcon}<span class="sr-only">Copy Markdown</span></button></div>
<div class="output"><span>HTML</span><input id="html" readonly><button class="copy-button" data-copy="html" title="Copy HTML" aria-label="Copy HTML">${copyIcon}<span class="sr-only">Copy HTML</span></button></div>
</div>
</section>
</main>
<footer>${siteFooter}</footer>
<script>
const ids = ["platform", "name", "mode", "width", "height", "radius", "padding"];
const read = id => document.getElementById(id);
const root = document.querySelector("main");
const publicBaseUrl = ((root && root.dataset.baseUrl) || location.origin).replace(/\\/+$/, "");
const encodePath = value => encodeURIComponent(value.trim() || "Sponsor");
const query = () => {
  const params = new URLSearchParams({
    w: read("width").value,
    h: read("height").value,
    radius: read("radius").value,
    padding: read("padding").value,
    theme: read("mode").value
  });
  return params.toString();
};
const update = () => {
  const name = read("name").value.trim() || "Sponsor";
  const base = publicBaseUrl + "/" + read("platform").value + "/" + encodePath(name);
  const svg = base + ".svg?" + query();
  const png = base + ".png?" + query() + "&scale=2";
  read("banner").src = svg;
  read("svgUrl").value = svg;
  read("pngUrl").value = png;
  read("markdown").value = "![](" + svg + ")";
  read("html").value = "<img src=\\"" + svg + "\\" alt=\\"Sponsor " + name.replaceAll("\\"", "&quot;") + "\\">";
};
ids.forEach(id => read(id).addEventListener("input", update));
document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const target = read(button.dataset.copy);
    await navigator.clipboard.writeText(target.value);
    button.dataset.state = "copied";
    button.setAttribute("aria-label", "Copied");
    setTimeout(() => {
      delete button.dataset.state;
      button.setAttribute("aria-label", button.title);
    }, 700);
  });
});
update();
</script>
</body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    }
  );
};
