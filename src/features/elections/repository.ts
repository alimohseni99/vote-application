import { Db } from "@/db";
import { eq } from "drizzle-orm";
import {
  electionPreferenceTable,
  electionTable,
  electionTableInsert,
  electionVoteTable,
} from "./schema/schema";

export function createRepository(db: Db) {
  return {
    async getAllElection() {
      return await db.select().from(electionTable);
    },
    async addElection(election: electionTableInsert) {
      await db.insert(electionTable).values(election).execute();
    },
    async addRepresentativeVote(
      electionId: string,
      choice: string,
      representativeId: string,
      totalVotes: string
    ) {
      await db
        .insert(electionVoteTable)
        .values({
          electionId,
          choice,
          representativeId,
          totalVotes,
        })
        .execute();
    },

    async addPublicPreference(
      electionId: string,
      electionPreference: string,
      voterId: string
    ) {
      await db
        .insert(electionPreferenceTable)
        .values({
          electionId,
          preference: electionPreference,
          voterId: voterId,
        })
        .execute();
    },
    async concludeElection(electionId: string) {
      await db
        .update(electionTable)
        .set({ status: "concluded" })
        .where(eq(electionTable.id, electionId))
        .execute();
    },
    async getElectionStatus(electionId: string) {
      return await db
        .select({ status: electionTable.status })
        .from(electionTable)
        .where(eq(electionTable.id, electionId))
        .execute();
    },
    async getWinnerOption(electionId: string) {
      return await db
        .select({ choice: electionVoteTable.choice })
        .from(electionVoteTable)
        .where(eq(electionVoteTable.electionId, electionId))
        .groupBy(electionVoteTable.choice)
        .limit(1)
        .execute();
    },
  };
}
