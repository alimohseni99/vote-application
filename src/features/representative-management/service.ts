import { Db } from "@/db";
import { createRepository } from "./repository";

export function createService(db: Db) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      const representatives = repository.getAllRepresentatives();
      return representatives;
    },
  };
}
