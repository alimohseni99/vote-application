"use server";

import { revalidatePath } from "next/cache";
import { representativeService } from "./instance";
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
  await representativeService.addRepresentative(representative);
}

export async function AddPublicVote(representativeId: string) {
  await representativeService.addPublicVote(representativeId);

  revalidatePath("/representative");
}
