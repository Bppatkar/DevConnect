import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
   
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-lg">
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search projects, users, or technologies..."
          className="w-full rounded-full border border-gray-700 bg-gray-800 px-10 py-2 text-white placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;