import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("ongoing"),
  choice: varchar({ length: 255 }).array().notNull(),
});

export const electionVoteTable = pgTable("election_vote", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id)
    .notNull()
    .unique(),
  choice: varchar({ length: 255 }).notNull(),
  representativeId: uuid().notNull(),
  totalVotes: varchar({ length: 255 }).notNull(),
});

export const electionPreferenceTable = pgTable("election_preference", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .references(() => electionTable.id)
    .notNull(),
  preference: varchar({ length: 255 }).notNull(),
  voterId: uuid().notNull(),
});

export type electionTableInsert = typeof electionTable.$inferInsert;
export type electionTableSelect = typeof electionTable.$inferSelect;

export type electionVoteTableInsert = typeof electionVoteTable.$inferInsert;
export type electionVoteTableSelect = typeof electionVoteTable.$inferSelect;

export type electionPreferenceTableInsert =
  typeof electionPreferenceTable.$inferInsert;
export type electionPreferenceTableSelect =
  typeof electionPreferenceTable.$inferSelect;
