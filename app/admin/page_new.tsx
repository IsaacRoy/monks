"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState("Sports");
  const [authorName, setAuthorName] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Sports", "Education", "Politic", "Games"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newNews = {
        id: Date.now(),
        headline,
        category,
        image: image || "/globe.svg",
        author: {
          name: authorName,
          avatar: "/globe.svg",
        },
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        content,
      };

      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      });

      if (response.ok) {
        // Reset form
        setHeadline("");
        setCategory("Sports");
        setAuthorName("");
        setImage("");
        setContent("");

        // Broadcast update event for live updates
        if (typeof window !== "undefined" && window.BroadcastChannel) {
          const channel = new BroadcastChannel("news-updates");
          channel.postMessage({ type: "NEWS_ADDED", news: newNews });
          channel.close();
        }

        alert("News added successfully!");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Error adding news. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative isolate z-50">
      {/* Header */}
      <div className="pt-6 px-4 relative z-50">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/")}
            className="p-2 -ml-2"
            aria-label="Go to home"
          >
            <svg
              className="w-6 h-6 text-[#111]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#111] mb-1">Admin Panel</h1>
          <p className="text-base text-[#888]">Manage your news articles</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-6 relative z-50">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Headline */}
          <div>
            <label htmlFor="headline" className="sr-only">
              Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] pointer-events-auto"
              placeholder="Enter news headline..."
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              title="Select category"
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base pointer-events-auto"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="authorName" className="sr-only">
              Author name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] pointer-events-auto"
              placeholder="Author name..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="sr-only">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              autoComplete="off"
              inputMode="url"
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] pointer-events-auto"
              placeholder="Image URL (optional)..."
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="sr-only">
              Article content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              autoComplete="off"
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] resize-none pointer-events-auto"
              placeholder="Article content (optional)..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2563EB] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Adding..." : "Add News"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
