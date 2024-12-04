import { sql } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const representativeTable = pgTable("representative", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  publicVotes: integer().notNull().default(0),
});

export const representativeVotesTable = pgTable("representative_votes", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: varchar({ length: 36 }).notNull(),
  representativeId: varchar({ length: 36 }).notNull(),
  choiceId: varchar({ length: 36 }).notNull(),
  votesUsed: integer().notNull(),
});
