"use client";

import React, { useState } from "react";
import { categories } from "../../discover/data/dummyNews";

const AddNewsForm = () => {
  const [formData, setFormData] = useState({
    headline: "",
    category: "Sports",
    image: "",
    authorName: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Create new news item
      const newNews = {
        id: Date.now(),
        headline: formData.headline,
        category: formData.category,
        image: formData.image || "/globe.svg",
        author: {
          name: formData.authorName,
          avatar: "/globe.svg",
        },
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        content: formData.content,
      };

      // Send to API endpoint
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      });

      if (response.ok) {
        const result = await response.json();

        // Reset form
        setFormData({
          headline: "",
          category: "Sports",
          image: "",
          authorName: "",
          content: "",
        });

        // Broadcast update event for live updates
        if (typeof window !== "undefined" && window.BroadcastChannel) {
          const channel = new BroadcastChannel("news-updates");
          channel.postMessage({ type: "NEWS_ADDED", news: newNews });
          channel.close();
        }

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
    <div className="px-4 mt-6">
      {/* Message Display */}
      {message && (
        <div className="mb-6">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Headline */}
        <div>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888]"
            placeholder="Enter news headline..."
          />
        </div>

        {/* Category */}
        <div>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            title="Select category"
            className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base"
          >
            {categories
              .filter((cat) => cat !== "All")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        {/* Author Name */}
        <div>
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888]"
            placeholder="Author name..."
          />
        </div>

        {/* Image URL */}
        <div>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888]"
            placeholder="Image URL (optional)..."
          />
        </div>

        {/* Content */}
        <div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl outline-none text-base placeholder-[#888] resize-none"
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
  );
};

export default AddNewsForm;
