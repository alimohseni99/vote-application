"use server";

import { revalidatePath } from "next/cache";
import { chatService } from "./instance";
import { Election, Representative } from "./type";

export async function addRepresentative({ name, email }: Representative) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const representative: Representative = {
    name,
    email,
    votes: 0,
  };
  await chatService.addRepresentative(representative);
}

export async function checkForDuplicateVote(
  representativeId: string
): Promise<boolean> {
  const publicVoters = "e3b0c442-98fc-1c14-9afb-14f7ec8b6ad6";
  const duplicateVotes = await chatService.checkForDuplicateVotes(
    publicVoters,
    representativeId
  );

  if (duplicateVotes) {
    return true;
  }
  return false;
}

export async function AddPublicVote(representativeId: string) {
  const publicVoters = "e3b0c442-98fc-1c14-9afb-14f7ec8b6ad6";
  const check = await checkForDuplicateVote(representativeId);

  if (check) {
    throw new Error("You already voted in this election");
  }
  await chatService.addPublicVote(publicVoters, representativeId);

  revalidatePath("/");
}

export async function addElection(election: Election) {
  await chatService.addElection(election);
}

export async function representativeVoteOnElection(
  electionId: string,
  choice: string
) {
  const representativesId = "9b38f6b0-62af-4c9d-b1b8-d94fcf0e7c12";

  console.log({ electionId, choice });

  await chatService.representativeVoteOnElection(
    representativesId,
    electionId,
    choice
  );
}
