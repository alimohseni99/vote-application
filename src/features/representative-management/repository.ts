import { Db } from "@/db";
import { representativesTable, votersTable } from "./schema/schema";
import { Representative } from "./type";

export function createRepository(db: Db) {
  return {
    async getAllRepresentatives() {
      return await db.select().from(representativesTable);
    },
    async addRepresentative(representative: Representative) {
      return await db
        .insert(representativesTable)
        .values(representative)
        .execute();
    },

    async addPublicVote(id: string, representativeId: string) {
      await db.insert(votersTable).values({ id, representativeId }).execute();
    },
  };
}
