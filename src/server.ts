import { serve } from "@hono/node-server";
import { app } from "./app";
import { serverConfig } from "./config/defaults";

serve(
  {
    fetch: app.fetch,
    port: serverConfig.port
  },
  (info) => {
    console.log(`sponsor-banner listening on http://localhost:${info.port}`);
  }
);
