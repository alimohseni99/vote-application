import { Db } from "@/db";
import { representativesTable } from "./schema/schema";

export function createRepository(db: Db) {
  return {
    async getAllRepresentatives() {
      return await db.select().from(representativesTable);
    },
  };
}
