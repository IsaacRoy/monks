"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryTabs from "./components/CategoryTabs";
import NewsFeed from "./components/NewsFeed";
import { NewsItem } from "./data/dummyNews";
import { useNews } from "../context/NewsContext";

const DiscoverPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();
  const { news, isLoading } = useNews();

  // Filter news based on active category
  const filteredNews = useMemo(() => {
    if (activeCategory === "All") {
      return news;
    }
    return news.filter(
      (newsItem) =>
        newsItem.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, news]);

  const handleNewsClick = (newsItem: NewsItem) => {
    // Navigate to article detail page
    router.push(`/discover/${newsItem.id}`);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (isLoading && news.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB] mx-auto"></div>
          <p className="mt-4 text-[#888] text-sm">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* Search Bar */}
      <SearchBar />

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* News Feed */}
      <NewsFeed news={filteredNews} onNewsClick={handleNewsClick} />

      {/* Add News Button - Fixed at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => router.push("/admin")}
          className="bg-[#2563EB] text-white p-3 rounded-full shadow-lg hover:bg-[#1d4ed8] transition-colors hover:scale-110 transform"
          title="Add News"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DiscoverPage;
