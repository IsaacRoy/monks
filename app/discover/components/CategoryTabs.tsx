import React from "react";
import { categories } from "../data/dummyNews";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="px-4 mt-6">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? "bg-[#2563EB] text-white font-bold"
                : "border border-[#E5E7EB] text-[#888] bg-transparent hover:bg-[#F9FAFB]"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
