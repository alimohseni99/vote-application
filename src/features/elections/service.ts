import { Db } from "@/db";
import { createRepository } from "./repository";
import { Election } from "./type";

export function createService(db: Db) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: Election) {
      return await repository.addElection(election);
    },
  };
}
