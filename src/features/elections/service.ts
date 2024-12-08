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
  getRepresentative: typeof representativesService.getRepresentativeById,
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
        totalVotes: totalVotes,
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

    async addElectionWinner(electionId: string, winnerChoice: string) {
      const election = await repository.getElectionById(electionId);
      const electionWinner = await repository.getElectionWinner(electionId);
      const representative = await getRepresentative(
        electionWinner[0]?.representativeId
      );

      console.log({ representative: representative });

      const winner: electionWinnerTableInsert = {
        electionId,
        name: representative.map((rep) => rep.name)[0],
        email: representative.map((rep) => rep.email)[0],
        totalVotes: electionWinner[0]?.totalVotes?.toString(),
        winnerChoice,
        choices: election[0]?.choices,
      };

      return repository.addElectionWinner(winner);
    },
  };
}
