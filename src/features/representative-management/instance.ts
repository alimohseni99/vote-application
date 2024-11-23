import { db } from "@/db";
import { createService } from "./service";

export const chatService = createService(db);
