import { pgTable, uuid } from "drizzle-orm/pg-core";

export const publicVotersTable = pgTable("public_voters", {
  id: uuid().primaryKey().default("c7a1ed89-68db-4c4f-8e5b-d3182bfa5c5d"),
});
