import { Db } from "@/db";
import {
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
      electionChoice: string,
      representativeId: string
    ) {
      await db
        .insert(electionVoteTable)
        .values({
          electionId,
          choice: electionChoice,
          voterId: representativeId,
        })
        .execute();
    },
  };
}
