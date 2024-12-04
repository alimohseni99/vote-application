import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const representativeTable = pgTable("representative", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const representativeVotesTable = pgTable("representative_votes", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: varchar({ length: 36 }).notNull(),
  publicVoterId: varchar({ length: 36 }).notNull(),
});

export type representativeTableInsert = typeof representativeTable.$inferInsert;
export type representativeTableSelect = typeof representativeTable.$inferSelect;

export type representativeVotesTableInsert =
  typeof representativeVotesTable.$inferInsert;
export type representativeVotesTableSelect =
  typeof representativeVotesTable.$inferSelect;
