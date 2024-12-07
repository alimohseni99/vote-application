import { electionService } from "../elections/instance";
import { createStatsService } from "./service";

export const statsService = createStatsService(
  electionService.getConcludedElectionData
);
