import { Db } from "@/db";
import { desc, eq } from "drizzle-orm";
import {
  electionPreferenceTable,
  electionPreferenceTableInsert,
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
      electionPreference: electionPreferenceTableInsert
    ) {
      await db
        .insert(electionPreferenceTable)
        .values(electionPreference)
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
    async getElectionPreference(electionId: string) {
      return await db
        .select()
        .from(electionPreferenceTable)
        .where(eq(electionPreferenceTable.electionId, electionId))
        .execute();
    },
    async getElectionWinnerChoice(electionId: string) {
      return await db
        .select({ winnerChoice: electionWinnerTable.winnerChoice })
        .from(electionWinnerTable)
        .where(eq(electionWinnerTable.electionId, electionId))
        .execute();
    },
  };
}
