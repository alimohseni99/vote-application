import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const representativesTable = pgTable("representative", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  votes: integer().notNull().default(0),
});

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  active: boolean().notNull().default(true),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  deactivatedTimeStamp: timestamp(),
  optionText: varchar({ length: 255 }).array().notNull(),
});

export const votersTable = pgTable("public_voter", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  publicVoterId: uuid().notNull(),
  representativeId: uuid().references(() => representativesTable.id),
  electionId: uuid().references(() => electionTable.id),
});

export const representativeVotesTable = pgTable("representative_votesTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: uuid()
    .notNull()
    .references(() => representativesTable.id),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id),
  choice: varchar().notNull(),
});

export const publicVotesTable = pgTable("public_votesTable", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  representativeId: uuid()
    .notNull()
    .references(() => votersTable.id),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id),
  choice: varchar().notNull(),
});
