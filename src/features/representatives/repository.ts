import { Db } from "@/db";
import { count, eq, sql } from "drizzle-orm";
import {
  representativeTable,
  representativeTableInsert,
  representativeVotesTable,
} from "./schema/schema";

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
    async addRepresentative(representative: representativeTableInsert) {
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
      return await db
        .select()
        .from(representativeTable)
        .where(eq(representativeTable.id, representativeId))
        .execute();
    },

    async getRepresentativeVotesById(representativeId: string) {
      const representatives = await db
        .select({ totalVotes: count() })
        .from(representativeVotesTable)
        .where(eq(representativeVotesTable.representativeId, representativeId))
        .execute();

      return representatives.map((vote) => ({ totalVotes: vote }));
    },
    async checkIfPublicVoterVoted(
      representativeId: string,
      publicVoterId: string
    ) {
      const vote = await db
        .select()
        .from(representativeVotesTable)
        .where(
          eq(representativeVotesTable.representativeId, representativeId) &&
            eq(representativeVotesTable.publicVoterId, publicVoterId)
        )
        .execute();
      return vote.length > 0;
    },
  };
}
