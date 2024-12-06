import { db } from "@/db";
import { publicService } from "../public/instance";
import { createService } from "./service";

export const representativeService = createService(
  db,
  publicService.getPublicVoterDataById
);
