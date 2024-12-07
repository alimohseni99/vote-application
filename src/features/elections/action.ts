"use server";

import { revalidatePath } from "next/cache";
import { electionService } from "./instance";
import { electionTableInsert, electionVoteTableInsert } from "./schema/schema";

export async function addElection(election: electionTableInsert) {
  await electionService.addElection(election);
}

export async function addRepresentativeVote(
  electionId: string,
  choice: string
) {
  const representativeId = "45902ca6-657b-4e7a-b630-74a967e4abfd";

  const vote: electionVoteTableInsert = {
    electionId,
    choice,
    representativeId,
  };

  await electionService.addRepresentativeVote(vote);
}
export async function addPublicPreference(
  electionId: string,
  electionPreference: string
) {
  const voterId = "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d";
  await electionService.addPublicPreference(
    electionId,
    electionPreference,
    voterId
  );
}
export async function concludeElection(electionId: string) {
  await electionService.concludeElection(electionId);
  revalidatePath("/election-vote");
}
