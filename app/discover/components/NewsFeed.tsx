import React, { useState, useEffect } from "react";
import { NewsItem } from "../data/dummyNews";
import NewsCard from "./NewsCard";

interface NewsFeedProps {
  news: NewsItem[];
  onNewsClick?: (newsItem: NewsItem) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news, onNewsClick }) => {
  const [shuffledNews, setShuffledNews] = useState<NewsItem[]>(news);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<
    "idle" | "slideOut" | "slideIn"
  >("idle");

  useEffect(() => {
    setShuffledNews(news);
    setCurrentIndex(0);
  }, [news]);

  useEffect(() => {
    if (news.length <= 1) return;

    const interval = setInterval(() => {
      setIsShuffling(true);
      setAnimationPhase("slideOut");

      // Phase 1: Slide out the top item (600ms)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);

        setShuffledNews((prev) => {
          const newArray = [...prev];
          // Move the first item to the end (sequential cycling)
          const firstItem = newArray.shift();
          if (firstItem) {
            newArray.push(firstItem);
          }
          return newArray;
        });

        // Phase 2: Slide in new item from bottom
        setAnimationPhase("slideIn");
        setShuffleKey((prev) => prev + 1);

        // Phase 3: End animation
        setTimeout(() => {
          setAnimationPhase("idle");
          setIsShuffling(false);
        }, 700);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="px-4 mt-6 pb-8">
      {shuffledNews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#888] text-base">
            No news found for this category
          </p>
        </div>
      ) : (
        <div className="news-container-3d">
          {shuffledNews.map((newsItem, index) => {
            let animationClass = "";

            if (isShuffling) {
              if (index === 0 && animationPhase === "slideIn") {
                // New top item sliding in from bottom
                animationClass = "news-item-slide-in";
              } else if (index === 0 && animationPhase === "slideOut") {
                // Current top item sliding out to left
                animationClass = "news-item-slide-out";
              } else if (index > 0) {
                // Other items shifting up
                animationClass = "news-item-shift-up";
              }
            }

            return (
              <div
                key={`${newsItem.id}-${shuffleKey}-${index}`}
                className={`
                  ${animationClass}
                  transform transition-all duration-300 ease-out
                  ${index === 0 ? "relative z-10" : "relative z-0"}
                `}
              >
                <NewsCard
                  news={newsItem}
                  onClick={() => onNewsClick?.(newsItem)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
