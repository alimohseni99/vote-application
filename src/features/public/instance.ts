import { db } from "@/db";
import { createPublicService } from "./service";

export const publicService = createPublicService(db);
