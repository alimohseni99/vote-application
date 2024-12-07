import { electionService } from "./../elections/instance";

export function createStatsService(
  getConcludedElectionData: typeof electionService.getConcludedElectionData
) {
  return {
    async getAllElection() {
      return getConcludedElectionData();
    },
  };
}
