import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db } from "../db/index.js";
import { postingsTable } from "../db/schema.js";
import { authorizationHeaderSchema } from "../lib/helpers.js";

const postings = new Hono()
  .get("/", async (c) => {
    const results = await db.select().from(postingsTable);

    return c.json(results);
  })
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

      const response = await db
        .insert(postingsTable)
        .values({
          userId: auth.userId,
          title,
          description,
          minSalary: salary?.min,
          maxSalary: salary?.max,
        })
        .returning({ id: postingsTable.id });

      return c.json(response[0]);
    },
  );

export default postings;
