import React, { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import SuggestedUsers from "./SuggestedUsers";

const StorySection = ({ setShowNotifications, setShowChat }) => {
  const [stories, setStories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [username, setUsername] = useState("");

  // Convert file → base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Ensure base64 has proper prefix
  const base64ToImageSrc = (base64) => {
    if (!base64) return "";
    if (base64.startsWith("data:image")) return base64;
    return `data:image/jpeg;base64,${base64}`;
  };

  // Fetch current user
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/me/`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      setUsername(res.data.username);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch stories
  const fetchStories = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/accounts/story/`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );

      // Group stories by user
      const grouped = {};
      res.data.forEach((story) => {
        const user = story.username || "You";
        if (!grouped[user]) grouped[user] = [];
        grouped[user].push(story);
      });

      // Format for frontend
      const formatted = Object.keys(grouped).map((user) => ({
        user,
        isOwn: user === username || user === "You",
        stories: grouped[user],
        avatar: grouped[user][0]?.media
          ? base64ToImageSrc(grouped[user][0].media)
          : null,
      }));

      // Ensure "Your Story" is first
      if (!formatted.some((s) => s.isOwn)) {
        formatted.unshift({
          user: "Your Story",
          isOwn: true,
          stories: [],
          avatar: null,
        });
      } else {
        formatted.sort((a) => (a.isOwn ? -1 : 1)); // your story always first
      }

      setStories(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser().then(fetchStories);
  }, [username]);

  // Upload story
  const handleStoryUpload = async (files, userIndex) => {
    if (!files) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    setUploading(true);

    try {
      for (const file of files) {
        const base64 = await fileToBase64(file);

        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/accounts/story/create`,
          { imageBase64: base64 },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const saved = res.data.story;

        setStories((prev) => {
          const updated = [...prev];

          // Update Your Story (first item)
          const yourStoryIndex = updated.findIndex((s) => s.isOwn);
          if (yourStoryIndex !== -1) {
            updated[yourStoryIndex].stories.push(saved);
            updated[yourStoryIndex].avatar = base64ToImageSrc(saved.media);
          } else {
            // fallback, add new "Your Story"
            updated.unshift({
              user: "Your Story",
              isOwn: true,
              stories: [saved],
              avatar: base64ToImageSrc(saved.media),
            });
          }

          return updated;
        });
      }
    } catch (err) {
      console.error("Story upload failed:", err);
      alert("Story upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg space-y-4">
      {/* STORIES ROW */}
      <div className="flex items-center gap-5 px-4 py-3 overflow-x-auto no-scrollbar">
        {stories.map((userStory, idx) => (
          <div key={idx} className="flex flex-col items-center text-xs w-[70px]">
            <div className="relative w-[70px] h-[70px]">
              <svg width="70" height="70" viewBox="0 0 70 70" className="absolute inset-0">
                <path
                  d="M17 4h36l13 14v34L53 66H17L4 52V18L17 4Z"
                  fill="none"
                  stroke="#F59700"
                  strokeWidth="2.22"
                />
                <defs>
                  <clipPath id={`hexClip-${idx}`}>
                    <path d="M17 4h36l13 14v34L53 66H17L4 52V18L17 4Z" />
                  </clipPath>
                </defs>
                {userStory.avatar && (
                  <image
                    href={base64ToImageSrc(userStory.avatar)}
                    width="70"
                    height="70"
                    clipPath={`url(#hexClip-${idx})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                )}
              </svg>

              {userStory.isOwn && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleStoryUpload(e.target.files, idx)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {!userStory.avatar && (
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2
                      w-5 h-5 rounded-full bg-white flex items-center justify-center
                      text-black font-bold text-sm border shadow"
                    >
                      +
                    </div>
                  )}
                </>
              )}
            </div>

            <span className="mt-2 text-center truncate w-full">
              {userStory.isOwn ? "Your Story" : userStory.user}
            </span>
          </div>
        ))}
      </div>

      <SuggestedUsers />

      {/* STORY VIEWER */}
      {currentStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => {
              setCurrentStory(null);
              setCurrentMediaIndex(0);
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <img
            src={base64ToImageSrc(currentStory.stories[currentMediaIndex].media)}
            alt="story"
            className="max-h-[80vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default StorySection;
