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

export const votersTable = pgTable("public_voter", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: uuid().references(() => representativesTable.id),
});

export const representativeVotesTable = pgTable("representative_votesTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: uuid()
    .notNull()
    .references(() => representativesTable.id),
  choice: varchar().notNull(),
});

export const publicVotesTable = pgTable("public_votesTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  publicVotersId: uuid()
    .notNull()
    .references(() => votersTable.id),
  choice: varchar().notNull(),
});
