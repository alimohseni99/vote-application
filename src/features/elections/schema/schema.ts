import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("ongoing"),
  choices: varchar({ length: 255 }).array().notNull(),
});

export const electionVoteTable = pgTable("election_vote", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id)
    .notNull(),
  choice: varchar({ length: 255 }).notNull(),
  representativeId: uuid().notNull(),
  totalVotes: varchar({ length: 255 }).default("0"),
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

export const electionWinnerTable = pgTable("election_winner", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .references(() => electionTable.id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  totalVotes: varchar({ length: 255 }).default("0"),
  winnerChoice: varchar({ length: 255 }).notNull(),
  choices: varchar({ length: 255 }).array().notNull(),
});

export type electionTableInsert = typeof electionTable.$inferInsert;
export type electionTableSelect = typeof electionTable.$inferSelect;

export type electionVoteTableInsert = typeof electionVoteTable.$inferInsert;
export type electionVoteTableSelect = typeof electionVoteTable.$inferSelect;

export type electionPreferenceTableInsert =
  typeof electionPreferenceTable.$inferInsert;
export type electionPreferenceTableSelect =
  typeof electionPreferenceTable.$inferSelect;

export type electionWinnerTableInsert = typeof electionWinnerTable.$inferInsert;
export type electionWinnerTableSelect = typeof electionWinnerTable.$inferSelect;
