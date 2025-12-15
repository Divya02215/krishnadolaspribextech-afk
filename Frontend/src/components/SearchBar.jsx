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
    const newTimer = setTimeout(() => {
      fetchSearchResults(query);
    }, 500);
    setTimer(newTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-[494px] h-[42px]">
      {/* SVG BACKGROUND */}
      <svg
        className="w-full h-full"
        viewBox="0 0 504 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ✅ WHITE BACKGROUND + BORDER */}
         <g transform="translate(0,0)">
    <path
      d="M16.8821 4.33374C17.4102 3.45628 18.3595 2.91968 19.3836 2.91968H487.408C487.858 2.91968 488.268 3.178 488.462 3.58382L498.105 23.7537C498.506 24.5916 498.484 25.57 498.046 26.3891L488.969 43.376C488.461 44.3263 487.471 44.9197 486.394 44.9197H19.3361C18.3378 44.9197 17.4086 44.4096 16.8727 43.5673L5.71237 26.0278C5.11791 25.0935 5.10311 23.9034 5.67416 22.9546L16.8821 4.33374Z"
      fill="#FFFFFF"
      stroke="#E8ECE9"
      strokeWidth="1"
    />
  </g>

        {/* INNER CONTENT */}
        <foreignObject x="0" y="0" width="504" height="53">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-[460px] px-4">
              {/* SEARCH ICON */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17ZM11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    fill="#73725E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.3202 15.2898C15.5084 15.103 15.7631 14.9986 16.0282 14.9995C16.2934 15.0005 16.5473 15.1067 16.7342 15.2948L20.7092 19.2948C20.8909 19.4839 20.991 19.7368 20.988 19.999C20.985 20.2613 20.8792 20.5118 20.6932 20.6968C20.5072 20.8817 20.2561 20.9861 19.9938 20.9876C19.7316 20.9891 19.4793 20.8876 19.2912 20.7048L15.3162 16.7048C15.1292 16.5167 15.0246 16.2621 15.0254 15.997C15.0261 15.7318 15.1322 15.4778 15.3202 15.2908Z"
                    fill="#73725E"
                  />
                </svg>
              </span>

              {/* INPUT */}
              <input
                type="text"
                placeholder="Search Anything"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="
                  w-full h-[40px]
                  pl-12 pr-4
                  bg-transparent
                  outline-none
                  font-[Nunito]
                  font-semibold
                  text-[16px]
                  leading-[100%]
                  tracking-[0]
                  text-[#73725E]
                  placeholder-[#B5B5B5]
                "
              />
            </div>
          </div>
        </foreignObject>
      </svg>

      {/* DROPDOWN */}
      {query && (
        <div className="absolute left-0 top-[46px] w-full bg-white shadow-md rounded-md z-50 max-h-80 overflow-y-auto hide-scrollbar">
          {loading && <p className="p-2 text-gray-500">Loading...</p>}

          {!loading &&
            !results.users.length &&
            !results.posts.length &&
            !results.hashtags.length && (
              <p className="p-2 text-gray-500">No results found</p>
            )}

          {results.users.map((user) => (
            <div key={user.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              @{user.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
