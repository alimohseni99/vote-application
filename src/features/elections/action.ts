"use server";
import { electionService } from "./instance";
import { Election } from "./type";

export async function addElection(election: Election) {
  await electionService.addElection(election);
}
