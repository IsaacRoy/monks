"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NewsItem, dummyNews } from "../discover/data/dummyNews";

interface NewsContextType {
  news: NewsItem[];
  addNews: (newsItem: NewsItem) => void;
  refreshNews: () => void;
  isLoading: boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(dummyNews);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch news from API
  const refreshNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const apiNews = await response.json();
        // Combine API news with dummy news, API news first
        setNews([...apiNews, ...dummyNews]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add news locally
  const addNews = (newsItem: NewsItem) => {
    setNews((prev) => [newsItem, ...prev]);
  };

  // Listen for live updates using BroadcastChannel
  useEffect(() => {
    if (typeof window !== "undefined" && window.BroadcastChannel) {
      const channel = new BroadcastChannel("news-updates");

      channel.onmessage = (event) => {
        if (event.data.type === "NEWS_ADDED") {
          addNews(event.data.news);
        }
      };

      return () => {
        channel.close();
      };
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    refreshNews();
  }, []);

  const value: NewsContextType = {
    news,
    addNews,
    refreshNews,
    isLoading,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
