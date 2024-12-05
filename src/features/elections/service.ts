import { Db } from "@/db";
import { createRepository } from "./repository";
import { electionTableInsert } from "./schema/schema";

export function createService(
  db: Db,
  getRepresentative: (representativeId: string) => Promise<string[]>,
  getPublicVoter: (voterId: string) => Promise<string[]>,
  getTotalOfVotes: (representativeId: string) => Promise<number[]>
) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: electionTableInsert) {
      return await repository.addElection(election);
    },
    async addRepresentativeVote(
      electionId: string,
      electionChoice: string,
      representativeId: string
    ) {
      const representative = await getRepresentative(representativeId);
      const totalOfVotes = await getTotalOfVotes(representativeId);
      if (representative.length === 0) {
        throw new Error("Representative not found");
      }
      return await repository.addRepresentativeVote(
        electionId,
        electionChoice,
        representativeId,
        totalOfVotes.join(",")
      );
    },
    async addPublicPreference(
      electionId: string,
      electionPreference: string,
      voterId: string
    ) {
      const voter = await getPublicVoter(voterId);
      if (voter.length === 0) {
        throw new Error("Voter not found");
      }
      return await repository.addPublicPreference(
        electionId,
        electionPreference,
        voterId
      );
    },
    async concludeElection(electionId: string) {
      return await repository.concludeElection(electionId);
    },
  };
}
