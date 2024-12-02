import { Db } from "@/db";
import { publicVotersTable } from "./schema/schema";
export function publicRepository(db: Db) {
  return {
    async getPublicVoterData() {
      return db.select().from(publicVotersTable);
    },
  };
}
