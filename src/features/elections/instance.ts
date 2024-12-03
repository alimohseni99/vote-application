import { db } from "@/db";
import { createService } from "./service";
import { representativeService } from "../representative/instance";

export const electionService = createService(
  db,
  representativeService.getRepresentativeById
);
