import { Db } from "@/db";
import { representativesService } from "../representative/instance";
import { createRepository } from "./repository";
import {
  electionTableInsert,
  electionVoteTableInsert,
  electionWinnerTableInsert,
} from "./schema/schema";

export function createService(
  db: Db,
  getRepresentative: (representativeId: string) => Promise<string[]>,
  getPublicVoter: (voterId: string) => Promise<string[]>,
  getRepresentativeVotes: typeof representativesService.getRepresentativeVotesById
) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: electionTableInsert) {
      return await repository.addElection(election);
    },
    async addRepresentativeVote(vote: electionVoteTableInsert) {
      const representative = await getRepresentative(vote.representativeId);

      const TotalVotes = await getRepresentativeVotes(vote.representativeId);
      const totalVotes = TotalVotes[0]?.totalVotes?.totalVotes || 0;

      console.log("TotalVotes:", { totalVotes });
      console.log("representative:", { representative });
      console.log("votes:", { ...vote });

      if (!vote.electionId || !vote.representativeId || !vote.choice) {
        throw new Error("Missing required vote properties");
      }

      return await repository.addRepresentativeVote({
        ...vote,
        totalVotes: totalVotes.toString(),
      });
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
      return await repository.updateElectionStatus(electionId);
    },
    async getConcludedElectionData() {
      return await repository.getConcludedElectionData();
    },
    async addElectionWinner(electionWinner: electionWinnerTableInsert) {
      return await repository.addElectionWinner(electionWinner);
    },
  };
}
