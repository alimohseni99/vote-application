import { electionTable } from "@/features/elections/schema/schema";
import { sql } from "drizzle-orm";
import { integer, pgTable, real, uuid } from "drizzle-orm/pg-core";

export const electionStatsTable = pgTable("election_stats", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  electionId: uuid().references(() => electionTable.id),
  agreementRate: real(),
  publicVotes: integer(),
});
