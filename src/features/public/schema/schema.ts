import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const publicVotersTable = pgTable("public_voters", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: varchar({ length: 36 }).notNull(),
  preferenceChoiceId: varchar({ length: 36 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
