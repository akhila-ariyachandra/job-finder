import { createId } from "@paralleldrive/cuid2";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const shortId = varchar("id", { length: 128 }).$defaultFn(() => createId());

export const postingsTable = pgTable(
  "posting",
  {
    id: shortId.primaryKey().notNull(),
    userId: text().notNull(),
    title: text().notNull(),
    slug: text().notNull(),
    description: text().notNull(),
    minSalary: integer(),
    maxSalary: integer(),
    timestamp: timestamp().defaultNow(),
  },
  (table) => {
    return {
      idSlugIdx: index("id_slug_idx").on(table.id, table.slug),
    };
  },
);

export const savedJobsTable = pgTable(
  "saved_job",
  {
    userId: text().notNull(),
    postingId: text().references(() => postingsTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.postingId],
      }),
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  },
);
