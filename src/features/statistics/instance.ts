import { db } from "@/db";
import { createStatsService } from "./service";

export const statsService = createStatsService(db);
