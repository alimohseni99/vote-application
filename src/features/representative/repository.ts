import { Db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { representativeTable } from "./schema/schema";
import { Representative } from "./type";

export function createRepository(db: Db, getPublicVoterData: () => Promise<string[]>) {
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

    async addPublicVote(representativeId: string) {
      await db
        .update(representativeTable)
        .set({ publicVotes: sql`${representativeTable.publicVotes} +1` })
        .where(eq(representativeTable.id, representativeId));
    },
  };
}
