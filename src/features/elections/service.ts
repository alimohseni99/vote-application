import { Db } from "@/db";
import { representativesService } from "../representative/instance";
import { createRepository } from "./repository";
import {
  electionPreferenceTableInsert,
  electionTableInsert,
  electionVoteTableInsert,
  electionWinnerTableInsert,
} from "./schema/schema";

export function createService(
  db: Db,
  getRepresentative: typeof representativesService.getRepresentativeById,
  getPublicVoter: (voterId: string) => Promise<string[]>,
  getPublicVoterData: typeof representativesService.getPublicVoterData,
  getRepresentativeVotes: typeof representativesService.getRepresentativeVotesById,
  getAllRepresentatives: typeof representativesService.getAllRepresentatives
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
      const TotalVotes = await getRepresentativeVotes(vote.representativeId);
      const totalVotes = TotalVotes[0]?.totalVotes?.totalVotes || 0;

      return await repository.addRepresentativeVote({
        ...vote,
        totalVotes: totalVotes,
      });
    },

    async addPublicPreference(vote: electionPreferenceTableInsert) {
      const voter = await getPublicVoter(vote.voterId);
      if (voter.length === 0) {
        throw new Error("Voter not found");
      }
      return await repository.addPublicPreference(
        vote.electionId,
        vote.preference,
        vote.voterId
      );
    },
    async concludeElection(electionId: string) {
      return await repository.updateElectionStatus(electionId);
    },
    async getConcludedElectionData() {
      return await repository.getConcludedElectionData();
    },

    async addElectionWinner(
      electionId: string,
      winnerChoice: string,
      title: string,
      time: Date
    ) {
      const election = await repository.getElectionById(electionId);
      const electionWinner = await repository.getElectionWinner(electionId);
      const representative = await getRepresentative(
        electionWinner[0]?.representativeId
      );

      const preferences = await repository.getElectionPreference(electionId);

      const agreed = preferences.filter(
        (preferences) => preferences.preference === winnerChoice
      ).length;
      const disagreed = preferences.length - agreed;

      const winner: electionWinnerTableInsert = {
        electionId,
        name: representative.map((rep) => rep.name)[0],
        title,
        time,
        email: representative.map((rep) => rep.email)[0],
        totalVotes: electionWinner[0]?.totalVotes?.toString(),
        winnerChoice,
        choices: election[0]?.choices,
        agreed,
        disagreed,
        total: preferences.length,
      };

      return repository.addElectionWinner(winner);
    },

    async getElectionWinnerChoice(electionId: string) {
      const winner = await repository.getElectionWinnerChoice(electionId);
      const preferences = await repository.getElectionPreference(electionId);

      const winnerChoice = winner[0]?.winnerChoice;

      const agreed = preferences.filter(
        (preferences) => preferences.preference === winnerChoice
      ).length;
      const disagreed = preferences.length - agreed;

      return {
        agreed,
        disagreed,
        total: preferences.length,
      };
    },
    async getPublicVoterData() {
      return await getPublicVoterData();
    },
    async getAllRepresentatives() {
      return await getAllRepresentatives();
    },
  };
}
