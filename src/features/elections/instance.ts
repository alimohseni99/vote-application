import { db } from "@/db";
import { publicService } from "../publicVoters/instance";
import { representativesService } from "../representatives/instance";
import { createService } from "./service";

export const electionsService = createService(
  db,
  representativesService.getRepresentativeById,
  publicService.getPublicVoterDataById,
  publicService.getPublicVoter,
  representativesService.getRepresentativeVotesById,
  representativesService.getAllRepresentatives
);
