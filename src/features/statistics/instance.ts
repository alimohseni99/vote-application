import { electionsService } from "../elections/instance";
import { createStatsService } from "./service";

export const statsService = createStatsService(
  electionsService.getConcludedElectionData
);
