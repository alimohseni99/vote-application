import { db } from "@/db";
import { createService } from "./service";
import { publicService } from "../public/instance";
import { electionService } from "../elections/instance";

export const representativeService = createService(db, publicService.getPublicVoterDataById, electionService.getElectionWinner);
