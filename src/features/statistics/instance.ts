import { db } from "@/db";
import { electionService } from "../elections/instance";
import { createStatsService } from "./service";

export const statsService = createStatsService(
  db,
  electionService.getAllElection,
  electionService.getElectionWinner
);
