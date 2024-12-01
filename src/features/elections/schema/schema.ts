import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  optionText: varchar({ length: 255 }).array().notNull(),
  status: varchar({ length: 50 }).notNull(), // can only be 'ongoing' or 'concluded'
});
