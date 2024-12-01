import { Db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
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
      const publicVote = await db
        .insert(votersTable)
        .values({ id, representativeId });
      if (!publicVote) {
        throw new Error("Something went wrong");
      }

      await db
        .update(representativesTable)
        .set({ votes: sql`${representativesTable.votes} +1` })
        .where(eq(representativesTable.id, representativeId));
    },
    async checkForDuplicateVote(
      publicVoterId: string,
      representativeId: string
    ): Promise<boolean> {
      const result = await db
        .select()
        .from(votersTable)
        .where(
          and(
            eq(votersTable.id, publicVoterId),
            eq(votersTable.representativeId, representativeId)
          )
        );

      return result.length > 0;
    },
  };
}
