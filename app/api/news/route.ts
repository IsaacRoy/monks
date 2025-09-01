import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import News from "../../../models/News";

export async function GET() {
  try {
    await dbConnect();

    // Get all news, sorted by creation date (newest first)
    const news = await News.find({}).sort({ createdAt: -1 });

    // Transform to match the frontend interface
    const transformedNews = news.map((item, index) => ({
      id: index + 1, // Generate sequential IDs for frontend
      image: item.image,
      category: item.category,
      headline: item.headline,
      author: item.author,
      date: item.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      content: item.content,
    }));

    return NextResponse.json(transformedNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const newNewsData = await request.json();

    // Create new news document
    const news = new News({
      image: newNewsData.image,
      category: newNewsData.category,
      headline: newNewsData.headline,
      author: {
        name: newNewsData.author?.name || "Anonymous",
        avatar: newNewsData.author?.avatar || "/globe.svg",
      },
      content: newNewsData.content || "",
    });

    // Save to database
    await news.save();

    return NextResponse.json({
      success: true,
      message: "News added successfully",
      news: {
        id: Date.now(), // Temporary ID for frontend
        image: news.image,
        category: news.category,
        headline: news.headline,
        author: news.author,
        date: news.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        content: news.content,
      },
    });
  } catch (error) {
    console.error("Error adding news:", error);
    return NextResponse.json(
      { success: false, message: "Error adding news" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await dbConnect();

    // Clear all news (for testing purposes)
    await News.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All news cleared",
    });
  } catch (error) {
    console.error("Error clearing news:", error);
    return NextResponse.json(
      { success: false, message: "Error clearing news" },
      { status: 500 }
    );
  }
}
