import { Db } from "@/db";
import { publicService } from "../public/instance";
import { createRepository } from "./repository";
import { representativeTableInsert } from "./schema/schema";

export function createService(
  db: Db,
  getPublicVoterDataById: typeof publicService.getPublicVoterDataById
) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },
    async addRepresentative(representative: representativeTableInsert) {
      return await repository.addRepresentative(representative);
    },
    async addPublicVote(representativeId: string, publicVoterId: string) {
      const publicVoter = await getPublicVoterDataById(publicVoterId);
      if (publicVoter.length === 0) {
        throw new Error("Representative not found");
      }
      await repository.addPublicVote(representativeId, publicVoterId);
    },
    async getRepresentativeById(representativeId: string) {
      return await repository.getRepresentativeById(representativeId);
    },
    async getRepresentativeVotesById(representativeId: string) {
      return await repository.getRepresentativeVotesById(representativeId);
    },
  };
}
