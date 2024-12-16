import { db } from "@/db";
import { publicService } from "../publicVoters/instance";
import { createService } from "./service";

export const representativesService = createService(
  db,
  publicService.getPublicVoterDataById,
  publicService.getPublicVoter
);
