import { RESULT_STATUS, VALID_OPERATION } from "@/types/game";
import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from 'zod';

const VALID_OPERATIONS_ARRAY = ['+', '-', '*', '/', '**', 'sqrt'] as const

export const results = mysqlTable("results", {
  id: serial('id').notNull().primaryKey(),
  userId: varchar('user_id', { length: 255 }),
  status: int('status').$type<RESULT_STATUS>().notNull(),
  operation: mysqlEnum('operation', VALID_OPERATIONS_ARRAY).$type<VALID_OPERATION>().notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    fsp: 3,
  }).defaultNow()
})

// Schema for CRUD - used to validate API requests
export const insertResultsSchema = createInsertSchema(results, { operation: z.enum(VALID_OPERATIONS_ARRAY) });
export const selectResultsSchema = createSelectSchema(results);
export const resultsUserIdSchema = selectResultsSchema.pick({ userId: true });
export const updateResultsSchema = selectResultsSchema;

export type Results = z.infer<typeof selectResultsSchema>;
export type NewResult = z.infer<typeof insertResultsSchema>;
export type ResultsUserId = z.infer<typeof resultsUserIdSchema>["userId"];

