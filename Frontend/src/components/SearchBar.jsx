import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ token }) => {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState(null);
  const [results, setResults] = useState({
    users: [],
    posts: [],
    hashtags: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (text) => {
    if (!text.trim()) {
      setResults({ users: [], posts: [], hashtags: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/accounts/search/?q=${text}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => fetchSearchResults(query), 500);
    setTimer(newTimer);
  }, [query]);

  return (
    <div className="relative w-[420px] h-[44px] max-w-full">
      {/* SVG BACKGROUND */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 504 53"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M16.88 4.33C17.41 3.46 18.36 2.92 19.38 2.92H487.4C487.86 2.92 488.27 3.18 488.46 3.58L498.1 23.75C498.5 24.59 498.48 25.57 498.05 26.38L488.97 43.37C488.46 44.32 487.47 44.92 486.39 44.92H19.33C18.34 44.92 17.41 44.41 16.87 43.56L5.71 26.02C5.12 25.09 5.1 23.9 5.67 22.95L16.88 4.33Z"
            fill="#FFFFFF"
            stroke="#E5E5DD"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center px-4">
        <input
          type="text"
          placeholder="Search Anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-[#73725E]"
        />
      </div>

      {/* RESULTS */}
      {query && (
        <div className="absolute left-0 top-[48px] w-full bg-white shadow-lg rounded-lg z-50 max-h-80 overflow-y-auto">
          {loading && <p className="p-3 text-gray-500">Loading...</p>}
          {!loading &&
            !results.users.length &&
            !results.posts.length &&
            !results.hashtags.length && (
              <p className="p-3 text-gray-500">No results found</p>
            )}
          {results.users.map((user) => (
            <div
              key={user.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              @{user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
