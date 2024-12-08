"use server";

import { revalidatePath } from "next/cache";
import { electionsService } from "./instance";
import {
  electionPreferenceTableInsert,
  electionTableInsert,
  electionVoteTableInsert,
} from "./schema/schema";

export async function addElectionAction(election: electionTableInsert) {
  await electionsService.addElection(election);
}

export async function addRepresentativeVoteAction(
  electionId: string,
  choice: string
) {
  const representativeId = "45902ca6-657b-4e7a-b630-74a967e4abfd";

  const vote: electionVoteTableInsert = {
    electionId,
    choice,
    representativeId,
  };

  await electionsService.addRepresentativeVote(vote);
}
export async function addPublicPreferenceAction(
  electionId: string,
  electionPreference: string
) {
  const voterId = "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d";
  const vote: electionPreferenceTableInsert = {
    electionId,
    preference: electionPreference,
    voterId,
  };

  await electionsService.addPublicPreference(vote);
}
export async function concludeElectionAction(
  electionId: string,
  winnerChoice: string,
  title: string,
  createdTime: Date
) {
  const time = new Date(createdTime);
  try {
    await electionsService.addElectionWinner(
      electionId,
      winnerChoice,
      title,
      time
    );
    await electionsService.concludeElection(electionId);
  } catch (error) {
    console.error("Error concluding election", error);
  }

  revalidatePath("/election-vote");
}
