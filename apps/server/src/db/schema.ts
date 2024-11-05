import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const postingsTable = pgTable("posting", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  minSalary: integer(),
  maxSalary: integer(),
  timestamp: timestamp().defaultNow(),
});
