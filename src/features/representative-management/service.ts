import { Db } from "@/db";
import { createRepository } from "./repository";
import { Representative } from "./type";

export function createService(db: Db) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },
    async addRepresentative(representative: Representative) {
      return await repository.addRepresentative(representative);
    },
    async addPublicVote(id: string, representativeId: string) {
      await repository.addPublicVote(id, representativeId);
    },
  };
}
