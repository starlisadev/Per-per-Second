import { type User, type InsertUser, type Content, type InsertContent } from "@shared/schema";
import { db } from "./db";
import { users, content } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllContent(): Promise<Content[]>;
  getContentById(id: string): Promise<Content | undefined>;
  createContent(contentData: InsertContent): Promise<Content>;
  incrementViews(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content);
  }

  async getContentById(id: string): Promise<Content | undefined> {
    const result = await db.select().from(content).where(eq(content.id, id)).limit(1);
    return result[0];
  }

  async createContent(contentData: InsertContent): Promise<Content> {
    const result = await db.insert(content).values(contentData).returning();
    return result[0];
  }

  async incrementViews(id: string): Promise<void> {
    await db.update(content)
      .set({ views: db.$default(() => content.views) })
      .where(eq(content.id, id));
  }
}

export const storage = new DbStorage();
