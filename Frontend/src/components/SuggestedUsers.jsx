// src/components/SuggestedUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SuggestionRow = ({ id, name, mutuals, avatar, initFollowing, refreshList }) => {
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
        `http://127.0.0.1:8000/api/accounts/follow/${id}/`,
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
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3 min-w-0">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-800 truncate">{name}</p>
          <p className="text-xs text-gray-500 truncate">{mutuals}</p>
        </div>
      </div>

      <button
        onClick={toggleFollow}
        disabled={loading}
        className={`text-sm font-semibold p-1 px-4 rounded-lg transition-all whitespace-nowrap border
          ${isFollowing ? "bg-gray-300 text-black" : "bg-[#73725E] text-white"}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
        "http://127.0.0.1:8000/api/accounts/suggestions/",
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
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">Suggested</h3>
        {suggestions.length > 4 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-700"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {visible.map((user) => (
          <SuggestionRow
            key={user.id}
            {...user}
            refreshList={fetchSuggestions}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
