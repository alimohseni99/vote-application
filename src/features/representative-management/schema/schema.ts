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
  createdTimeStamp: timestamp().notNull(),
  active: boolean(),
  deactivatedTimeStamp: timestamp().notNull(),
});
