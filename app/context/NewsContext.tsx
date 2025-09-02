"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { NewsItem, dummyNews } from "../discover/data/dummyNews";
import { useBroadcastChannel } from "../../hooks/useBroadcastChannel";

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

  // Handle broadcast messages from other tabs
  const handleBroadcastMessage = useCallback((data: any) => {
    switch (data.type) {
      case "NEWS_ADDED":
        setNews((prev) => {
          // Check if news already exists to avoid duplicates
          const exists = prev.some(item => item.id === data.news.id);
          if (!exists) {
            console.log("Adding news from broadcast:", data.news);
            return [data.news, ...prev];
          }
          return prev;
        });
        break;
      case "NEWS_REFRESH":
        refreshNews();
        break;
      default:
        break;
    }
  }, []);

  // Initialize Broadcast Channel
  const { broadcast } = useBroadcastChannel("news-updates", handleBroadcastMessage);

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

  // Add news locally and broadcast to other tabs
  const addNews = (newsItem: NewsItem) => {
    setNews((prev) => [newsItem, ...prev]);
    
    // Broadcast to other tabs
    broadcast({
      type: "NEWS_ADDED",
      news: newsItem
    });
  };

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
