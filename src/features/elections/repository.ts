import { Db } from "@/db";
import { electionTable } from "./schema/schema";
import { Election } from "./type";

export function createRepository(db: Db) {
  return {
    async getAllElection() {
      return await db.select().from(electionTable);
    },
    async addElection(election: Election) {
      return await db.insert(electionTable).values(election);
    },
  };
}
