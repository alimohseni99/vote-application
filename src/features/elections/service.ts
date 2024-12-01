import { Db } from "@/db";
import { createRepository } from "./repository";
import { Election, ElectionChoice } from "./type";

export function createService(db: Db) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: Election, electionChoice: ElectionChoice[]) {
      return await repository.addElection(election, electionChoice);
    },
  };
}
