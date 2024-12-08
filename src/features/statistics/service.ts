import { electionsService } from "./../elections/instance";

export function createStatsService(
  getConcludedElectionData: typeof electionsService.getConcludedElectionData
) {
  return {
    async getAllElection() {
      return getConcludedElectionData();
    },
  };
}
