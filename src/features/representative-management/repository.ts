import { Db } from "@/db";
import { sql } from "drizzle-orm";
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

    async addPublicVote(publicVoterId: string, representativeId: string) {
      const publicVote = await db
        .insert(votersTable)
        .values({ publicVoterId, representativeId })
        .execute();
      if (!publicVote) {
        throw new Error("Something went wrong");
      }

      await db
        .update(representativesTable)
        .set({ votes: sql`${representativesTable.votes} +1` });
    },
  };
}
