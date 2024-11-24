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
export const votersTable = pgTable("voter", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  publicVoterId: uuid().notNull(),
  representativeId: uuid()
    .notNull()
    .references(() => representativesTable.id),
});

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  active: boolean().notNull().default(true),
  deactivatedTimeStamp: timestamp(),
});
export const electionOptionsTable = pgTable("election_options", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .references(() => electionTable.id)
    .notNull(),
  optionText: varchar({ length: 255 }).notNull(),
});
