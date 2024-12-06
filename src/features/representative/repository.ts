import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { representativeTable, representativeVotesTable } from "./schema/schema";
import { Representative } from "./type";

export function createRepository(db: Db) {
  return {
    async getAllRepresentatives() {
      return await db.select().from(representativeTable);
    },
    async addRepresentative(representative: Representative) {
      return await db
        .insert(representativeTable)
        .values(representative)
        .execute();
    },

    async addPublicVote(representativeId: string, publicVoterId: string) {
      await db
        .insert(representativeVotesTable)
        .values({ representativeId, publicVoterId })
        .execute();
    },

    async getRepresentativeById(representativeId: string) {
      const representatives = await db
        .select({ id: representativeTable.id })
        .from(representativeTable)
        .where(eq(representativeTable.id, representativeId))
        .execute();

      return representatives.map((rep) => rep.id);
    },

    async getRepresentativeVotesById(representativeId: string) {
      return await db
        .select()
        .from(representativeVotesTable)
        .where(eq(representativeVotesTable.id, representativeId))
        .execute();
    },
  };
}
