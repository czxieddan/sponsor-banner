import { Hono } from "hono";
import { serverConfig } from "./config/defaults";
import { bannerRoute } from "./routes/banner";
import { faviconRoute } from "./routes/favicon";
import { previewRoute } from "./routes/preview";

export const app = new Hono();

app.get("/", previewRoute);

if (serverConfig.siteFaviconFilePath && serverConfig.siteFaviconHref.startsWith("/")) {
  app.get(serverConfig.siteFaviconHref, faviconRoute);
}

app.get("/:platform/:name", bannerRoute);

app.notFound((c) => c.text("Not Found", 404));
