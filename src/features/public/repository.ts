import { Db } from "@/db";
import { publicVotersTable } from "./schema/schema";
export function publicRepository(db: Db) {
  return {
    async getPublicData() {
      return db.select().from(publicVotersTable);
    },
  };
}
