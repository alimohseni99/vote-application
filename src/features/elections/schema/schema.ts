import { representativeTable } from "@/features/representative/schema/schema";
import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull(), // can only be 'ongoing' or 'concluded'
});

export const electionChoicesTable = pgTable("election_choices", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id),
  choice: varchar({ length: 50 }).notNull(),
});

export const votes = pgTable("votes", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid()
    .notNull()
    .references(() => electionTable.id),
  electionChoiceId: uuid()
    .notNull()
    .references(() => electionChoicesTable.id),
  representativeId: uuid()
    .notNull()
    .references(() => representativeTable.id),

  publicVotes: integer().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
