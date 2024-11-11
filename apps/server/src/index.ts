import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import postings from "./routes/postings.js";
import webhooks from "./routes/webhooks.js";

const app = new Hono()
  .use("*", logger())
  .use("*", clerkMiddleware())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/postings", postings)
  .route("/webhooks", webhooks);

const port = 4000;
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port.toString()}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
