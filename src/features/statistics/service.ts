import { electionsService } from "@/features";

export function createStatsService(
  getConcludedElectionData: typeof electionsService.getConcludedElectionData
) {
  return {
    async getAllElection() {
      return getConcludedElectionData();
    },
  };
}
