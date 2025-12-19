// src/components/SuggestedUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SuggestionRow = ({
  id,
  name,
  mutuals,
  avatar,
  initFollowing,
  refreshList,
}) => {
  const [isFollowing, setIsFollowing] = useState(initFollowing);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/follow/${id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsFollowing((prev) => !prev);
      if (refreshList) refreshList();
    } catch (err) {
      console.error("Follow/unfollow failed:", err.response?.data || err);
      alert("Failed to update follow status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-6 py-2">
      {/* LEFT: AVATAR + NAME */}
      <div className="flex items-center space-x-3 min-w-0">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-800 truncate">
            {name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {mutuals}
          </p>
        </div>
      </div>

      {/* RIGHT: FOLLOW BUTTON */}
      <button
        onClick={toggleFollow}
        disabled={loading}
        className={`text-sm font-semibold px-4 py-1 rounded-lg transition-all whitespace-nowrap border
          ${isFollowing ? "bg-gray-300 text-black" : "bg-[#73725E] text-white"}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {loading ? "..." : isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

const SuggestedUsers = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchSuggestions = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.warn("No access token found");
      setSuggestions([]);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/suggestions/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const formatted = res.data.map((u) => ({
        id: u.id,
        name: u.username,
        mutuals: u.mutuals || "Suggested for you",
        avatar: u.avatar || `https://i.pravatar.cc/150?img=${u.id + 5}`,
        initFollowing: u.is_following,
      }));

      setSuggestions(formatted);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  if (loading) return <div className="p-4">Loading suggestions...</div>;

  const visible = showAll ? suggestions : suggestions.slice(0, 4);

  return (
    <div className="bg-white p-4 rounded-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-base text-black">
          Suggested
        </h3>

        {suggestions.length > 4 && (
          <span
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-gray-500 cursor-pointer select-none"
          >
            {showAll ? "Show Less" : "See All"}
          </span>
        )}
      </div>

      {/* LIST */}
      <div>
        {visible.map((user, index) => (
          <div
            key={user.id}
            className={`${
              index !== visible.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <SuggestionRow
              {...user}
              refreshList={fetchSuggestions}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
