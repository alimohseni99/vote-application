import { Db } from "@/db";

export function createStatsRepository(db: Db) {
  return {
    async getAgreementStats() {
      return [];
    },
  };
}
