import { Db } from "@/db";
import { createRepository } from "./repository";
import { electionTableInsert } from "./schema/schema";

export function createService(db: Db) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: electionTableInsert) {
      return await repository.addElection(election);
    },
  };
}
