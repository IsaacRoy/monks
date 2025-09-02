"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNews } from "../context/NewsContext";

const AdminPage = () => {
  const router = useRouter();
  const { addNews } = useNews();
  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState("Sports");
  const [authorName, setAuthorName] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const categories = ["Sports", "Education", "Politic", "Games"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const newNews = {
        id: Date.now(),
        headline,
        category,
        image: image || "/globe.svg",
        author: {
          name: "Admin",
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
        const result = await response.json();

        // Add news to context (this will also broadcast to other tabs)
        addNews(newNews);

        // Reset form
        setHeadline("");
        setCategory("Sports");
        setImage("");
        setContent("");

        setMessage({
          type: "success",
          text: "News article added successfully!",
        });

        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add news");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Error adding news. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 px-4">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/")}
            className="p-2 mr-3"
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
          <div>
            <h1 className="text-3xl font-bold text-[#111] mb-1">Admin Panel</h1>
            <p className="text-base text-[#888]">Manage your news articles</p>
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="px-4 mt-4 relative z-50">
          <div
            className={`p-4 rounded-xl ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.text}
          </div>
        </div>
      )}

      {/* Form */}
      <div className="px-4 mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Headline */}
          <div>
            <input
              type="text"
              value={headline}
              onChange={(e) => {
                console.log("Headline changed:", e.target.value);
                setHeadline(e.target.value);
              }}
              required
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] text-black"
              placeholder="Enter news headline..."
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              title="Select category"
              className="w-full px-4 py-3 pr-10 bg-[#F5F5F5] rounded-xl outline-none text-base text-black appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-[#888]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <input
              type="url"
              value={image}
              onChange={(e) => {
                console.log("Image URL changed:", e.target.value);
                setImage(e.target.value);
              }}
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] text-black"
              placeholder="Image URL (optional)..."
            />
          </div>

          {/* Content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] resize-none text-black"
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
