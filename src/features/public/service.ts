import { Db } from "@/db";
import { publicRepository } from "./repository";

export function createPublicService(db: Db) {
  const repository = publicRepository(db);
  return {
    async getPublicVoter() {
      return await repository.getPublicVoterData();
    },
    async getPublicVoterDataById(id: string) {
      return await repository.getPublicVoterDataById(id);
    },

    async addPublicVoterById(id: string) {
      return await repository.addPublicVoterById(id);
    },
  };
}
