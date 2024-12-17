import { clerkMiddleware } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import postings from "./routes/postings.js";
import savedJobs from "./routes/saved-jobs.js";
import webhooks from "./routes/webhooks.js";

const app = new Hono()
  .use("*", logger())
  .use("*", cors())
  .use("*", clerkMiddleware())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/postings", postings)
  .route("/save-jobs", savedJobs)
  .route("/webhooks", webhooks);

const port = 4000;
// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port.toString()}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
