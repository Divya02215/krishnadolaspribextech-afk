// src/components/SearchBar.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ token }) => {
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState(null);
  const [results, setResults] = useState({ users: [], posts: [], hashtags: [] });
  const [loading, setLoading] = useState(false);

  // 🔍 API CALL FUNCTION
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

  // 🔁 Debounce search
  useEffect(() => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      fetchSearchResults(query);
    }, 500);
    setTimer(newTimer);
  }, [query]);

  return (
  <div
  className="font-end"
  style={{
    width: "494px",
    height: "42px",
    position: "absolute",
    top: "30px",
    background: "#FFFFFF",
    borderRadius: "6px", // optional, remove if not needed
    overflow: "hidden",
  }}
>

  <div className="relative w-full h-full">
    {/* SVG Background — unchanged */}
    <svg
      className="w-full h-full"
      viewBox="0 0 504 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* YOUR ORIGINAL SVG CODE BELOW — NO CHANGE */}
      <g filter="url(#filter0_d_2085_579)">
        <path
          d="M16.8821 4.33374C17.4102 3.45628 18.3595 2.91968 19.3836 2.91968H487.408C487.858 2.91968 488.268 3.178 488.462 3.58382L498.105 23.7537C498.506 24.5916 498.484 25.57 498.046 26.3891L488.969 43.376C488.461 44.3263 487.471 44.9197 486.394 44.9197H19.3361C18.3378 44.9197 17.4086 44.4096 16.8727 43.5673L5.71237 26.0278C5.11791 25.0935 5.10311 23.9034 5.67416 22.9546L16.8821 4.33374Z"
          fill="white"
        />
        <path
          d="M19.3838 3.41968H487.408C487.665 3.41971 487.9 3.56754 488.011 3.79956L497.654 23.9695C497.986 24.6636 497.968 25.4744 497.605 26.1531L488.528 43.1404C488.107 43.9279 487.287 44.4197 486.394 44.4197H19.3359C18.5086 44.4196 17.7391 43.9966 17.2949 43.2986L6.13379 25.7595C5.64119 24.9853 5.62938 23.9989 6.10254 23.2126L17.3105 4.59155C17.721 3.90975 18.4381 3.47599 19.2256 3.42456L19.3838 3.41968Z"
          stroke="#E8ECE9"
        />
      </g>

      <foreignObject x="20" y="8" width="465" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Anything..."
              className="w-full h-10 pl-10 pr-4 text-sm outline-none text-gray-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </foreignObject>

      <defs>
        <filter
          id="filter0_d_2085_579"
          x="0.000287533"
          y="-8.44002e-05"
          width="503.646"
          height="52.5111"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.33581" />
          <feGaussianBlur stdDeviation="2.62779" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2085_579" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2085_579" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>

  {/* Dropdown remains same */}
  {query && (
    <div className="absolute left-0 right-0 mt-1 w-full bg-white shadow-md rounded-md z-50 max-h-80 overflow-y-auto">
      {loading && <p className="p-2 text-gray-500">Loading...</p>}

      {!loading &&
        results.users.length === 0 &&
        results.posts.length === 0 &&
        results.hashtags.length === 0 && (
          <p className="p-2 text-gray-500">No results found</p>
        )}

      {results.users.map((user) => (
        <div key={user.id} className="p-2 hover:bg-gray-100 cursor-pointer">
          <span className="font-medium">@{user.username}</span>
        </div>
      ))}

      {results.posts.map((post) => (
        <div key={post.id} className="p-2 hover:bg-gray-100 cursor-pointer">
          <span>{post.caption}</span>
        </div>
      ))}

      {results.hashtags.map((tag) => (
        <div key={tag.id} className="p-2 hover:bg-gray-100 cursor-pointer">
          <span>#{tag.name}</span>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default SearchBar;
