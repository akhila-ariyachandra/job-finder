import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { db } from "../db/index.js";
import { postingsTable } from "../db/schema.js";
import { authorizationHeaderSchema, getSlug } from "../lib/helpers.js";

const postings = new Hono()
  .get("/", async (c) => {
    const results = await db.query.postingsTable.findMany({
      columns: {
        id: true,
        title: true,
        slug: true,
        description: true,
      },
    });

    return c.json(results);
  })
  .get(
    "/:id/:slug",
    zValidator(
      "param",
      z.object({
        id: z.string().min(24).max(24),
        slug: z.string().min(1),
      }),
    ),
    async (c) => {
      const { id, slug } = c.req.param();

      const result = await db.query.postingsTable.findFirst({
        columns: {
          id: true,
          title: true,
          slug: true,
          description: true,
        },
        where: and(eq(postingsTable.id, id), eq(postingsTable.slug, slug)),
      });

      if (!result) {
        throw new HTTPException(404);
      }

      return c.json({
        id: result.id,
        title: result.title,
        slug: result.slug,
        description: result.description,
      });
    },
  )
  .post(
    "/",
    zValidator(
      "header",
      z.object({
        authorization: authorizationHeaderSchema,
      }),
    ),
    zValidator(
      "json",
      z.object({
        title: z.string(),
        description: z.string(),
        salary: z
          .object({
            min: z.number().int().optional(),
            max: z.number().int().optional(),
          })
          .optional(),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        throw new HTTPException(401);
      }

      const { title, description, salary } = c.req.valid("json");

      const slug = getSlug(title);

      const response = await db
        .insert(postingsTable)
        .values({
          userId: auth.userId,
          title,
          slug,
          description: sanitizeHtml(description),
          minSalary: salary?.min,
          maxSalary: salary?.max,
        })
        .returning({ id: postingsTable.id, slug: postingsTable.slug });

      const job = response[0];

      if (!job) {
        throw new HTTPException();
      }

      return c.json(job);
    },
  );

export default postings;
