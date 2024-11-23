"use server";

import { chatService } from "./instance";
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
  await chatService.addRepresentative(representative);
}

export async function AddPublicVote(representativeId: string) {
  const publicVoters = "e3b0c442-98fc-1c14-9afb-14f7ec8b6ad6";

  await chatService.addPublicVote(publicVoters, representativeId);
}
