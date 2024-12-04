import { Db } from "@/db";
import { createStatsRepository } from "./repository";

export function createStatsService(db: Db) {
  const repository = createStatsRepository(db);
  return {
    async getAgreementStats() {
      return repository.getAgreementStats();
    },
  };
}
