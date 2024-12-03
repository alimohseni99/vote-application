"use server";
import { electionService } from "./instance";
import { electionTableInsert } from "./schema/schema";

export async function addElection(election: electionTableInsert) {
  await electionService.addElection(election);
}

export async function addRepresentativeVote(
  electionId: string,
  electionChoice: string
) {
  const representativeId = "45902ca6-657b-4e7a-b630-74a967e4abfd";
  await electionService.addRepresentativeVote(
    electionId,
    electionChoice,
    representativeId
  );
}
