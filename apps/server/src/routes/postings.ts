import { Hono } from "hono";
import { db } from "../db/index.js";
import { postingsTable } from "../db/schema.js";
import { validator } from "hono/validator";
import { object, z } from "zod";
import { HTTPException } from "hono/http-exception";

const postings = new Hono();

postings.get("/", async (c) => {
  const results = await db.select().from(postingsTable);

  return c.json(results);
});

const postBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  salary: z
    .object({
      min: z.number().int().optional(),
      max: z.number().int().optional(),
    })
    .optional(),
});

postings.post(
  "/",
  validator("json", async (data, c) => {
    try {
      const parsedResponse = await postBodySchema.parseAsync(data);

      return parsedResponse;
    } catch {
      throw new HTTPException(400, {
        message: "Invalid",
      });
    }
  }),
  async (c) => {
    const { title, description, salary } = c.req.valid("json");

    const response = await db
      .insert(postingsTable)
      .values({
        title,
        description,
        minSalary: salary?.min,
        maxSalary: salary?.max,
      })
      .returning({ id: postingsTable.id });

    return c.text(response[0].id);
  }
);

export default postings;
