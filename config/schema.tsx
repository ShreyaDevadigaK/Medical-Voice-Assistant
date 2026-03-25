 import { integer, pgTable, varchar, text, json, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});

export const sessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation: json().notNull().default([]),
  report: json(),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: varchar()
});

// Dedicated reports table for independent report management
export const reportsTable = pgTable("reportsTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),                        // links to sessionChatTable
  reportData: json().notNull(),                          // full AI-generated report
  specialist: varchar({ length: 255 }),                  // doctor type
  chiefComplaint: text(),                                // searchable complaint summary
  createdBy: varchar().references(() => usersTable.email),
  createdOn: varchar(),
});
