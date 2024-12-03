"use server";
import { electionService } from "./instance";
import { electionTableInsert } from "./schema/schema";

export async function addElection(election: electionTableInsert) {
  await electionService.addElection(election);
}
