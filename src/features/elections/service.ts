import { Db } from "@/db";
import { createRepository } from "./repository";
import { electionTableInsert } from "./schema/schema";

export function createService(
  db: Db,
  getRepresentative: (representativeId: string) => Promise<string[]>
) {
  const repository = createRepository(db);

  return {
    async getAllElection() {
      return await repository.getAllElection();
    },
    async addElection(election: electionTableInsert) {
      return await repository.addElection(election);
    },
    async addRepresentativeVote(
      electionId: string,
      electionChoice: string,
      representativeId: string
    ) {
      const representative = await getRepresentative(representativeId);
      if (representative.length === 0) {
        throw new Error("Representative not found");
      }
      return await repository.addRepresentativeVote(
        electionId,
        electionChoice,
        representativeId
      );
    },
  };
}
