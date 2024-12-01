import { db } from "@/db";
import { createService } from "./service";

export const electionService = createService(db);
