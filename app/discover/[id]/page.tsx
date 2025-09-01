"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BackArrowIcon } from "../components/Icons";
import { useNews } from "../../context/NewsContext";

const ArticleDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { news } = useNews();
  const articleId = parseInt(params.id as string);

  const article = news.find((newsItem) => newsItem.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111] mb-4">
            Article Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#2563EB] text-white rounded-lg font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 px-4 pb-4 border-b border-[#F0F0F0]">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 mb-4"
          aria-label="Go back"
        >
          <BackArrowIcon className="w-6 h-6 text-[#111]" />
        </button>
      </div>

      {/* Article Content */}
      <div className="px-4 py-6">
        {/* Category */}
        <span className="text-sm text-[#2563EB] font-medium uppercase tracking-wide">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#111] mt-2 mb-4 leading-tight">
          {article.headline}
        </h1>

        {/* Author and Date */}
        <div className="flex items-center mb-6 text-sm text-[#888]">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#F5F5F5]">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-medium ml-3">{article.author.name}</span>
          <span className="mx-2 text-[#CCC]">·</span>
          <span>{article.date}</span>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#F5F5F5] mb-6">
          <Image
            src={article.image}
            alt={article.headline}
            width={400}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article Content */}
        <div className="prose max-w-none">
          {article.content ? (
            <div className="text-base text-[#333] leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          ) : (
            <>
              <p className="text-base text-[#333] leading-relaxed mb-4">
                This is a detailed article about{" "}
                {article.headline.toLowerCase()}. In this comprehensive piece,
                we explore the various aspects and implications of this
                important topic.
              </p>

              <p className="text-base text-[#333] leading-relaxed mb-4">
                Our research team has gathered extensive information to provide
                you with the most accurate and up-to-date insights. This article
                covers multiple perspectives and expert opinions on the subject.
              </p>

              <p className="text-base text-[#333] leading-relaxed mb-4">
                We believe this information will be valuable for our readers who
                are interested in staying informed about current events and
                developments in the {article.category.toLowerCase()} sector.
              </p>

              <p className="text-base text-[#333] leading-relaxed">
                Stay tuned for more updates and follow our publication for the
                latest news and analysis from around the world.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
