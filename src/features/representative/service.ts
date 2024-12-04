import { Db } from "@/db";
import { createRepository } from "./repository";
import { Representative } from "./type";

export function createService(
  db: Db,
  getPublicVoterDataById: (publicVoterId: string) => Promise<string[]>
) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },
    async addRepresentative(representative: Representative) {
      return await repository.addRepresentative(representative);
    },
    async addPublicVote(representativeId: string) {
      //await repository.addPublicVote(representativeId);
    },
    async getRepresentativeById(representativeId: string) {
      return await repository.getRepresentativeById(representativeId);
    },
    async getRepresentativeVotesById(representativeId: string) {
      return await repository.getRepresentativeVotesById(representativeId);
    },
  };
}
