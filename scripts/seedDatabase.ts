import "dotenv/config";
import dbConnect from "../lib/mongodb";
import News from "../models/News";
import { dummyNews } from "../app/discover/data/dummyNews";

async function seedDatabase() {
  try {
    await dbConnect();

    // Clear existing data
    await News.deleteMany({});
    console.log("Cleared existing news data");

    // Insert dummy data
    for (const newsItem of dummyNews) {
      const news = new News({
        image: newsItem.image,
        category: newsItem.category,
        headline: newsItem.headline,
        author: newsItem.author,
        content: newsItem.content || "",
      });

      await news.save();
    }

    console.log("Database seeded with dummy data");
    console.log(`Added ${dummyNews.length} news items`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
