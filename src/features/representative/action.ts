"use server";

import { revalidatePath } from "next/cache";
import { representativeService } from "./instance";
import { Representative } from "./type";
const publicVoters = "e3b0c442-98fc-1c14-9afb-14f7ec8b6ad6";

export async function addRepresentative({ name, email }: Representative) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const representative: Representative = {
    name,
    email,
    votes: 0,
  };
  await representativeService.addRepresentative(representative);
}

export async function checkForDuplicateVote(
  representativeId: string
): Promise<boolean> {
  const duplicateVotes = await representativeService.checkForDuplicateVotes(
    publicVoters,
    representativeId
  );

  if (duplicateVotes) {
    return true;
  }
  return false;
}

export async function AddPublicVote(representativeId: string) {
  const check = await checkForDuplicateVote(representativeId);

  if (check) {
    throw new Error("You already voted in this election");
  }
  await representativeService.addPublicVote(publicVoters, representativeId);

  revalidatePath("/");
}
