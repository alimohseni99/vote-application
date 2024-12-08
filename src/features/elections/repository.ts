import { Db } from "@/db";
import { desc, eq } from "drizzle-orm";
import {
  electionPreferenceTable,
  electionTable,
  electionTableInsert,
  electionVoteTable,
  electionVoteTableInsert,
  electionWinnerTable,
  electionWinnerTableInsert,
} from "./schema/schema";

export function createRepository(db: Db) {
  return {
    async getAllElection() {
      return await db.select().from(electionTable);
    },
    async getElectionById(electionId: string) {
      return await db
        .select()
        .from(electionTable)
        .where(eq(electionTable.id, electionId))
        .execute();
    },
    async addElection(election: electionTableInsert) {
      await db.insert(electionTable).values(election).execute();
    },

    async addRepresentativeVote(vote: electionVoteTableInsert) {
      await db.insert(electionVoteTable).values(vote).execute();
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
    async updateElectionStatus(electionId: string) {
      await db
        .update(electionTable)
        .set({ status: "concluded" })
        .where(eq(electionTable.id, electionId))
        .execute();
    },

    async addElectionWinner(electionWinner: electionWinnerTableInsert) {
      await db.insert(electionWinnerTable).values(electionWinner).execute();
    },
    async getElectionWinner(electionId: string) {
      return await db
        .select()
        .from(electionVoteTable)
        .where(eq(electionVoteTable.electionId, electionId))
        .orderBy(desc(electionVoteTable.totalVotes))
        .limit(1)
        .execute();
    },
    async getConcludedElectionData() {
      return await db.select().from(electionWinnerTable).execute();
    },
  };
}
