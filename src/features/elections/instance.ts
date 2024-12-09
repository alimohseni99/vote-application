import { db } from "@/db";
import { publicService } from "../publicVoter/instance";
import { representativesService } from "../representative/instance";
import { createService } from "./service";

export const electionsService = createService(
  db,
  representativesService.getRepresentativeById,
  publicService.getPublicVoterDataById,
  publicService.getPublicVoter,
  representativesService.getRepresentativeVotesById,
  representativesService.getAllRepresentatives
);
