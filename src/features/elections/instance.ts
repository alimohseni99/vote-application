import { db } from "@/db";
import { publicService } from "../public/instance";
import { representativesService } from "../representative/instance";
import { createService } from "./service";

export const electionService = createService(
  db,
  representativesService.getRepresentativeById,
  publicService.getPublicVoterDataById,
  representativesService.getRepresentativeVotesById
);
