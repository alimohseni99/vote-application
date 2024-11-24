import { Db } from "@/db";
import { createRepository } from "./repository";
import { Election, Representative } from "./type";

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
    async checkForDuplicateVotes(
      publicVoteId: string,
      representativeId: string
    ) {
      return await repository.checkForDuplicateVote(
        publicVoteId,
        representativeId
      );
    },
    async addElection(election: Election) {
      return await repository.addElection(election);
    },

    async getAllElection() {
      return await repository.getAllElection();
    },
    async representativeVoteOnElection(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      return await repository.representativeVoteOnElection(
        representativeId,
        electionId,
        choice
      );
    },
  };
}
