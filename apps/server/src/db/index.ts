import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);
