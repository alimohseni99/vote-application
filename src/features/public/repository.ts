import { Db } from "@/db";
import { eq } from "drizzle-orm";
import { publicVotersTable } from "./schema/schema";
export function publicRepository(db: Db) {
  return {
    async getPublicVoterData() {
      return db.select().from(publicVotersTable);
    },
    async getPublicVoterDataById(id: string) {
      const publicVoter = await db
        .select({ id: publicVotersTable.id })
        .from(publicVotersTable)
        .where(eq(publicVotersTable.id, id));

      return publicVoter.map((voter) => voter.id);
    },
    async createPublicVoterData() {
      return db.insert(publicVotersTable).values({}).execute();
    },
  };
}
