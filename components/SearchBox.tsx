"use client";

import { useState, useEffect, useRef } from "react";

export default function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const boxRef = useRef(null);

  // --- CLOSE DROPDOWN WHEN CLICKING OUTSIDE ---
  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

      // backend returns { query: "", suggestions: [] }
      setSuggestions(data.suggestions || []);
      setShowDropdown(true);
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // --- SELECT SUGGESTION ---
  const handleSelect = (city) => {
    onSearch(city);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  // --- ENTER KEY SEARCH ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setQuery("");
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          w-full p-3 rounded-xl 
          bg-white/20 backdrop-blur-xl 
          text-white placeholder-white/60
          border border-white/30
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
        placeholder="Search city..."
        autoComplete="off"
      />

      {/* DROPDOWN */}
      {showDropdown && suggestions.length > 0 && (
        <div
          className="
            absolute left-0 right-0 mt-2 
            bg-white/20 backdrop-blur-xl 
            border border-white/30 
            rounded-xl shadow-xl p-2 z-20
          "
        >
          {suggestions.map((city, i) => (
            <div
              key={i}
              onClick={() => handleSelect(city)}
              className="
                px-3 py-2 rounded-lg cursor-pointer 
                text-white hover:bg-white/30 transition
              "
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
