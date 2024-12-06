import { Db } from "@/db";
import { electionService } from "../elections/instance";
import { createRepository } from "./repository";
import { Representative } from "./type";
import { publicService } from "../public/instance";

export function createService(
  db: Db,
  getPublicVoterDataById: typeof publicService.getPublicVoterDataById,
  getElectionWinner: typeof electionService.getElectionWinner
) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },
    async addRepresentative(representative: Representative) {
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
    async getTotalOfVotes(representativeId: string) {
      return await repository.getTotalOfVotes(representativeId);
    },
    async getElectionWinner() {
      return await getElectionWinner();
    },
  };
}
