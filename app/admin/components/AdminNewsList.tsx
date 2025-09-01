"use client";

import React from "react";
import Image from "next/image";
import { useNews } from "../../context/NewsContext";

const AdminNewsList = () => {
  const { news } = useNews();

  // Show only the first 5 recent news items for admin overview
  const recentNews = news.slice(0, 5);

  if (recentNews.length === 0) {
    return (
      <div className="px-4 mt-6">
        <h3 className="text-lg font-bold text-[#111] mb-4">Recent News</h3>
        <div className="text-center py-8">
          <p className="text-[#888] text-base">No news articles yet</p>
          <p className="text-[#888] text-sm mt-1">
            Add your first article above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-6 pb-8">
      <h3 className="text-lg font-bold text-[#111] mb-4">Recent News</h3>
      {recentNews.map((newsItem) => (
        <div
          key={newsItem.id}
          className="flex mb-4 p-2 bg-[#F9FAFB] rounded-lg"
        >
          {/* Thumbnail */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F5F5] flex-shrink-0">
            <Image
              src={newsItem.image}
              alt={newsItem.headline}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="ml-3 flex-1 min-w-0 flex flex-col justify-center">
            {/* Category Label */}
            <span className="text-xs text-[#2563EB] font-medium uppercase tracking-wide mb-1">
              {newsItem.category}
            </span>

            {/* Headline */}
            <h4 className="font-medium text-sm text-[#111] line-clamp-2 leading-tight">
              {newsItem.headline}
            </h4>

            {/* Author and Date */}
            <div className="flex items-center mt-1 text-xs text-[#888]">
              <span>{newsItem.author.name}</span>
              <span className="mx-1">·</span>
              <span>{newsItem.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNewsList;
