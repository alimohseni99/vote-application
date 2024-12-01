import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  active: boolean().notNull().default(true),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  deactivatedTimeStamp: timestamp(),
  optionText: varchar({ length: 255 }).array().notNull(),
});
