"use server";

import { chatService } from "./instance";
import { Representative } from "./type";
export async function addRepresentative({ name, email }: Representative) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  const representative = {
    name,
    email,
  };
  await chatService.addRepresentative(representative);
}
