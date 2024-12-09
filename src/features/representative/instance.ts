import { db } from "@/db";
import { publicService } from "../publicVoter/instance";
import { createService } from "./service";

export const representativesService = createService(
  db,
  publicService.getPublicVoterDataById,
  publicService.getPublicVoter
);
