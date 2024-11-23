import { sql } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const representativesTable = pgTable("representative", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  votes: integer().notNull().default(0),
});
export const votersTable = pgTable("voter", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: uuid()
    .notNull()
    .references(() => representativesTable.id),
});
