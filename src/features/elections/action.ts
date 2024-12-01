"use server";
import { electionService } from "./instance";
import { Election, ElectionChoice } from "./type";

export async function addElection(
  election: Election,
  electionChoices: ElectionChoice[]
) {
  await electionService.addElection(election, electionChoices);
}
