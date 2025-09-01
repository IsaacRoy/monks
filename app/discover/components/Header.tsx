import React from "react";
import { BackArrowIcon } from "./Icons";

const Header = () => {
  return (
    <div className="pt-6 px-4">
      {/* Header with back arrow and title */}
      <div className="flex items-center mb-6">
        <button className="p-2 mr-3" aria-label="Go back">
          <BackArrowIcon className="w-6 h-6 text-[#111]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#111] mb-1">Discover</h1>
          <p className="text-base text-[#888]">
            News from all around the world
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
