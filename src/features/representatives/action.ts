"use server";

import { revalidatePath } from "next/cache";
import { representativesService } from "./instance";
import { representativeTableInsert } from "./schema/schema";
import { Representative } from "./type";

export async function addRepresentativeAction({ name, email }: Representative) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const representative: representativeTableInsert = {
    name,
    email,
  };
  await representativesService.addRepresentativeAction(representative);
}

export async function AddPublicVoteAction(representativeId: string) {
  const publicVoter = "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d";
  await representativesService.addPublicVote(representativeId, publicVoter);

  revalidatePath("/representative");
}
