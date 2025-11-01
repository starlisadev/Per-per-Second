import { db } from "./db";
import { content } from "@shared/schema";

const sampleContent = [
  {
    title: "Italian Pasta Cooking Masterclass",
    creator: "Chef Maria",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Learn how to make authentic Italian pasta from scratch. This comprehensive masterclass covers everything from making the perfect dough to creating delicious sauces. Perfect for beginners and experienced cooks alike.",
    thumbnailUrl: "cooking-thumbnail",
    duration: "24:15",
    pricePerTick: "0.01",
    views: 12543,
  },
  {
    title: "Morning Yoga Flow for Beginners",
    creator: "Yoga with Sarah",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Start your day with this relaxing yoga flow designed for complete beginners. Improve flexibility, reduce stress, and build strength.",
    thumbnailUrl: "yoga-thumbnail",
    duration: "18:30",
    pricePerTick: "0.008",
    views: 8921,
  },
  {
    title: "React Hooks Complete Guide",
    creator: "CodeMaster",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Master React Hooks in this comprehensive tutorial. Learn useState, useEffect, useContext, and custom hooks with practical examples.",
    thumbnailUrl: "coding-thumbnail",
    duration: "42:20",
    pricePerTick: "0.012",
    views: 15782,
  },
  {
    title: "Swiss Alps Travel Vlog",
    creator: "Wanderlust Adventures",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Join us on a breathtaking journey through the Swiss Alps. Discover hidden gems, local cuisine, and stunning mountain vistas.",
    thumbnailUrl: "travel-thumbnail",
    duration: "31:45",
    pricePerTick: "0.009",
    views: 21045,
  },
  {
    title: "Music Production in FL Studio",
    creator: "BeatMaker Pro",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Learn professional music production techniques in FL Studio. Create beats, mix tracks, and master your music like a pro.",
    thumbnailUrl: "music-thumbnail",
    duration: "36:12",
    pricePerTick: "0.011",
    views: 9834,
  },
  {
    title: "Chemistry Experiments for Kids",
    creator: "Science Fun Lab",
    creatorWallet: "GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6UJQCQH3RKCXQTB2YO",
    description:
      "Fun and safe chemistry experiments that kids can do at home. Learn about chemical reactions, acids and bases, and more!",
    thumbnailUrl: "science-thumbnail",
    duration: "15:48",
    pricePerTick: "0.007",
    views: 18234,
  },
];

async function seed() {
  try {
    console.log("Seeding database...");
    
    // Clear existing content
    await db.delete(content);
    console.log("Cleared existing content");
    
    // Insert sample content
    for (const item of sampleContent) {
      await db.insert(content).values(item);
    }
    
    console.log(`Seeded ${sampleContent.length} content items`);
    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
