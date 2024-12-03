import { Db } from "@/db";
import { electionTable, electionTableInsert } from "./schema/schema";

export function createRepository(db: Db) {
  return {
    async getAllElection() {
      return await db.select().from(electionTable);
    },
    async addElection(election: electionTableInsert) {
      await db.insert(electionTable).values(election).execute();
    },
  };
}
