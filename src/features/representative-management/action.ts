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

  if (await checkForDuplicateVote(representativeId)) {
    throw new Error("You already voted in this election");
  }
  await chatService.addPublicVote(publicVoters, representativeId);

  revalidatePath("/");
}

export async function addElection({
  optionA,
  optionB,
  optionC,
  optionD,
}: Election) {
  if (!optionA || !optionB || !optionB || !optionB) {
    throw new Error("Enter at least one option");
  }
  const election: Election = {
    optionA,
    optionB,
    optionC,
    optionD,
  };
  await chatService.addElection(election);
}
