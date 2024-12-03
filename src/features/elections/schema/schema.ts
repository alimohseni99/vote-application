import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 50 }).notNull(),
  createdTimeStamp: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("ongoing"),
  choice: varchar({ length: 255 }).array().notNull(),
});

export type electionTableInsert = typeof electionTable.$inferInsert;
export type electionTableSelect = typeof electionTable.$inferSelect;
