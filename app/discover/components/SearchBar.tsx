import React, { useState } from "react";
import { SearchIcon } from "./Icons";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center bg-[#F5F5F5] rounded-xl px-4 py-3">
        <SearchIcon className="w-5 h-5 text-[#888] mr-3" />
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-transparent flex-1 outline-none text-base placeholder-[#888] text-black"
          placeholder="Search"
          type="text"
        />
      </div>
    </div>
  );
};

export default SearchBar;
