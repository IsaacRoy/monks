"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BackArrowIcon } from "./Icons";

const AdminHeader = () => {
  const router = useRouter();

  return (
    <div className="pt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/")}
          className="p-2 -ml-2"
          aria-label="Go to home"
        >
          <BackArrowIcon className="w-6 h-6 text-[#111]" />
        </button>
      </div>

      {/* Title Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#111] mb-1">Admin Panel</h1>
        <p className="text-base text-[#888]">Manage your news articles</p>
      </div>
    </div>
  );
};

export default AdminHeader;
