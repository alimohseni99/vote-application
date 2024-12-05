import { Db } from "@/db";
import { electionService } from "./../elections/instance";
import { createStatsRepository } from "./repository";

export function createStatsService(
  db: Db,
  getAllElection: typeof electionService.getAllElection
) {
  const repository = createStatsRepository(db);
  return {
    async getAgreementStats() {
      return repository.getAgreementStats();
    },
    async getAllElection() {
      return getAllElection();
    },
  };
}
