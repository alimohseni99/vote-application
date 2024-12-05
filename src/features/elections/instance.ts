import { db } from "@/db";
import { publicService } from "../public/instance";
import { representativeService } from "../representative/instance";
import { createService } from "./service";

export const electionService = createService(
  db,
  representativeService.getRepresentativeById,
  publicService.getPublicVoterDataById,
  representativeService.getTotalOfVotes
);
