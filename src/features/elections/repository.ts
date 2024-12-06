import { Db } from "@/db";
import { desc, eq } from "drizzle-orm";
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
      representativeId: string
    ) {
      await db
        .insert(electionVoteTable)
        .values({
          electionId,
          choice,
          representativeId,
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

    async getElectionWinner() {
      return await db
        .select()
        .from(electionVoteTable)
        .orderBy(desc(electionVoteTable.totalVotes))
        .limit(1)
        .execute();
    },
  };
}
