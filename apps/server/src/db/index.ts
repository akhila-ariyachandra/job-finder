import { drizzle } from "drizzle-orm/libsql";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(process.env.DB_FILE_NAME!);
