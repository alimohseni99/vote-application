import { Db } from "@/db";
import { electionChoicesTable, electionTable } from "./schema/schema";
import { Election, ElectionChoice } from "./type";

export function createRepository(db: Db) {
  return {
    async getAllElection() {
      return await db.select().from(electionTable);
    },
    async addElection(election: Election, electionChoices: ElectionChoice[]) {
      const [createdElection] = await db
        .insert(electionTable)
        .values(election)
        .returning();

      for (const choice of electionChoices) {
        await db.insert(electionChoicesTable).values({
          electionId: createdElection.id,
          choice: choice.choice,
        });
      }
    },
  };
}
