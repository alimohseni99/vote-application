import { sql } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const publicVotersTable = pgTable("public_voters", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
});
