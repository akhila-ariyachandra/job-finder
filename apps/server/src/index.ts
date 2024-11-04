import { serve } from "@hono/node-server";
import { Hono } from "hono";
import postings from "./routes/postings.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/postings", postings);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
