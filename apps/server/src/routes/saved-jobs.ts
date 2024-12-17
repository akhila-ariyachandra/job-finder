import { getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db } from "../db/index.js";
import { savedJobsTable } from "../db/schema.js";
import { authorizationHeaderSchema } from "../lib/helpers.js";

const savedJobs = new Hono()
  .get("/", async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json([]);
    }

    const results = await db.query.savedJobsTable.findMany({
      columns: {
        postingId: true,
      },
    });

    return c.json(results.map((result) => result.postingId));
  })
  .post(
    "/:postingId",
    zValidator(
      "header",
      z.object({
        authorization: authorizationHeaderSchema,
      }),
    ),
    zValidator(
      "param",
      z.object({
        postingId: z.string().min(24).max(24),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        throw new HTTPException(401);
      }

      const { postingId } = c.req.param();

      // Check if record already exists
      const result = await db.query.savedJobsTable.findFirst({
        where: and(
          eq(savedJobsTable.userId, auth.userId),
          eq(savedJobsTable.postingId, postingId),
        ),
      });
      if (result) {
        throw new HTTPException(409);
      }

      // Create the record
      const response = await db
        .insert(savedJobsTable)
        .values({
          userId: auth.userId,
          postingId,
        })
        .returning({ postingId: savedJobsTable.postingId });

      if (!response[0]) {
        throw new HTTPException();
      }

      return c.json({
        message: "Job saved",
      });
    },
  )
  .delete(
    "/:postingId",
    zValidator(
      "header",
      z.object({
        authorization: authorizationHeaderSchema,
      }),
    ),
    zValidator(
      "param",
      z.object({
        postingId: z.string().min(24).max(24),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        throw new HTTPException(401);
      }

      const { postingId } = c.req.param();

      // Check if record doesn't exist
      const result = await db.query.savedJobsTable.findFirst({
        where: and(
          eq(savedJobsTable.userId, auth.userId),
          eq(savedJobsTable.postingId, postingId),
        ),
      });
      if (!result) {
        throw new HTTPException(404);
      }

      // Delete the record
      await db
        .delete(savedJobsTable)
        .where(
          and(
            eq(savedJobsTable.userId, auth.userId),
            eq(savedJobsTable.postingId, postingId),
          ),
        );

      return c.json({
        message: "Job unsaved",
      });
    },
  );

export default savedJobs;
