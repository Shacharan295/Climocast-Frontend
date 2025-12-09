"use client";

import { useState, useEffect } from "react";

export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // --- LIVE AUTOCOMPLETE ---
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/suggest?query=${query}`
      );
      const data = await res.json();
      setSuggestions(data);
      setShowDropdown(true);
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // --- ON SELECT A SUGGESTION ---
  const handleSelect = (city) => {
    setQuery(city);
    setShowDropdown(false);
    onSearch(city);
  };

  // --- ON ENTER KEY SEARCH ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 rounded-lg bg-white/20 backdrop-blur text-black"
        placeholder="Search city..."
      />

      {/* --- DROPDOWN --- */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white/80 backdrop-blur rounded-lg shadow-lg p-2 z-10">
          {suggestions.map((city, i) => (
            <div
              key={i}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer rounded-md"
              onClick={() => handleSelect(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
