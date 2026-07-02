import { describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("api", () => {
  it("returns svg by default", async () => {
    const response = await app.request("/patreon/RHoiScribe");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("image/svg+xml");
    expect(response.headers.get("cache-control")).toContain("immutable");
  });

  it("returns png by extension", async () => {
    const response = await app.request("/patreon/RHoiScribe.png?scale=2");
    const body = new Uint8Array(await response.arrayBuffer());

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("image/png");
    expect([...body.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });

  it("returns 404 for unknown platform", async () => {
    const response = await app.request("/unknown/RHoiScribe");

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Unknown Platform");
  });

  it("returns preview html", async () => {
    const response = await app.request("/");

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
  });
});
