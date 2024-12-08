import { Db } from "@/db";
import { publicRepository } from "./repository";

export function createPublicService(db: Db) {
  const repository = publicRepository(db);
  return {
    async getPublicVoterData() {
      return await repository.getPublicVoterData();
    },
    async getPublicVoterDataById(id: string) {
      return await repository.getPublicVoterDataById(id);
    },
    async createPublicVoter() {
      return await repository.createPublicVoterData();
    },
  };
}
