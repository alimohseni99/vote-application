import { Db } from "@/db";
import { count, eq, sql } from "drizzle-orm";
import { representativeTable, representativeVotesTable } from "./schema/schema";
import { Representative } from "./type";

export function createRepository(db: Db) {
  return {
    async getAllRepresentatives() {
      const representativesWithVotes = await db
        .select({
          id: representativeTable.id,
          name: representativeTable.name,
          email: representativeTable.email,
          totalVotes: sql`COUNT(${representativeVotesTable.id})`.as("votes"),
        })
        .from(representativeTable)
        .leftJoin(
          representativeVotesTable,
          eq(representativeTable.id, representativeVotesTable.representativeId)
        )
        .groupBy(representativeTable.id);
      return representativesWithVotes;
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
      const representatives = await db
        .select({ totalVotes: count() })
        .from(representativeVotesTable)
        .where(eq(representativeVotesTable.id, representativeId))
        .execute();

      return representatives.map((vote) => ({ totalVotes: vote }));
    },
  };
}
