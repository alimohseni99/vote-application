import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const publicVotersTable = pgTable("public_voters", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp().notNull().defaultNow(),
});

export const publicRepresentativeVotesTable = pgTable(
  "public_representative_votes",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    voterId: uuid()
      .notNull()
      .references(() => publicVotersTable.id),
    representativeId: varchar({ length: 36 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  }
);

export const publicElectionChoiceVotesTable = pgTable(
  "public_election_choice_votes",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    voterId: uuid()
      .notNull()
      .references(() => publicVotersTable.id),
    electionChoiceId: varchar({ length: 36 }).notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  }
);
