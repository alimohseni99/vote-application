import { db } from "@/db";
import { createService } from "./service";
import { publicService } from "../public/instance";

export const representativeService = createService(db, publicService.getPublicVoterData);
