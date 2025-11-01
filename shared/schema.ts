import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const content = pgTable("content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  creator: text("creator").notNull(),
  creatorWallet: text("creator_wallet").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  duration: text("duration").notNull(),
  pricePerTick: numeric("price_per_tick", { precision: 10, scale: 4 }).notNull(),
  views: integer("views").notNull().default(0),
});

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  views: true,
});

export type InsertContent = z.infer<typeof insertContentSchema>;
export type Content = typeof content.$inferSelect;
