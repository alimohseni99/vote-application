"use server";

import { revalidatePath } from "next/cache";
import { representativesService } from "./instance";
import { Representative } from "./type";

export async function addRepresentative({ name, email }: Representative) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const representative: Representative = {
    name,
    email,
    votes: 0,
  };
  await representativesService.addRepresentative(representative);
}

export async function AddPublicVote(representativeId: string) {
  const publicVoter = "c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d";
  await representativesService.addPublicVote(representativeId, publicVoter);

  revalidatePath("/representative");
}
