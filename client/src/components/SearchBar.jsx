// client/src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Optional: Real-time search by uncommenting the line below
    // onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search projects, users, or technologies..."
          className="form-input pl-10 pr-4 w-full rounded-full border-2 border-light-background focus:border-primary focus:ring-0"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
