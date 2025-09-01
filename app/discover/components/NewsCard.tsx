import React from "react";
import Image from "next/image";
import { NewsItem } from "../data/dummyNews";

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <div
      className="flex mb-6 cursor-pointer hover:bg-[#F9FAFB] p-3 rounded-lg transition-colors bg-[#FAFAFA] border border-[#F0F0F0]"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F5F5F5] flex-shrink-0">
        <Image
          src={news.image}
          alt={news.headline}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="ml-4 flex-1 min-w-0 flex flex-col justify-center">
        {/* Category Label */}
        <span className="text-xs text-[#888] font-normal uppercase tracking-wide mb-2">
          {news.category}
        </span>

        {/* Headline */}
        <h2 className="font-bold text-base text-[#111] line-clamp-2 leading-tight">
          {news.headline}
        </h2>
      </div>
    </div>
  );
};

export default NewsCard;
