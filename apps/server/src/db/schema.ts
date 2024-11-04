import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";

export const postingsTable = sqliteTable("posting", {
  id: text()
    .primaryKey()
    .$default(() => nanoid()),
  title: text().notNull(),
  description: text().notNull(),
  minSalary: int(),
  maxSalary: int(),
  timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
});
