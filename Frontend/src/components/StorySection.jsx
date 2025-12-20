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
    <div className="p-0.3 bg-white  rounded-lg px-0 py-0 space-y-2">
  {/* STORIES ROW */}
  <div className="flex items-center gap-5 px-4 py-3 overflow-x-auto no-scrollbar">
    {stories.map((userStory, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center text-xs w-[70px]"
      >
        {/* STORY SHAPE */}
        <div className="relative w-[70px] h-[103px]">
          <svg
            width="70"
            height="103"
            viewBox="0 0 70 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            {/* CLIP PATH */}
            <defs>
              <clipPath id={`storyClip-${idx}`}>
                <path d="M30.335 2.33594C33.2228 0.703165 36.7772 0.703164 39.665 2.33594L64.2051 16.2109C67.1082 17.8524 68.8887 20.889 68.8887 24.166V51.834C68.8887 55.111 67.1082 58.1476 64.2051 59.7891L39.665 73.6641C36.7773 75.2968 33.2228 75.2968 30.335 73.6641L5.79492 59.7891C2.89183 58.1476 1.11133 55.111 1.11133 51.834V24.166C1.11133 20.889 2.89183 17.8524 5.79492 16.2109L30.335 2.33594Z" />
              </clipPath>
            </defs>

            {/* STORY IMAGE */}
            {userStory.avatar && (
              <image
                href={base64ToImageSrc(userStory.avatar)}
                width="70"
                height="103"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#storyClip-${idx})`}
              />
            )}

            {/* ORANGE BORDER */}
            <path
              d="M30.335 2.33594C33.2228 0.703165 36.7772 0.703164 39.665 2.33594L64.2051 16.2109C67.1082 17.8524 68.8887 20.889 68.8887 24.166V51.834C68.8887 55.111 67.1082 58.1476 64.2051 59.7891L39.665 73.6641C36.7773 75.2968 33.2228 75.2968 30.335 73.6641L5.79492 59.7891C2.89183 58.1476 1.11133 55.111 1.11133 51.834V24.166C1.11133 20.889 2.89183 17.8524 5.79492 16.2109L30.335 2.33594Z"
              stroke="#F59700"
              strokeWidth="2.2"
              fill="none"
            />
          </svg>

          {/* OWN STORY UPLOAD */}
          {userStory.isOwn && (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  handleStoryUpload(e.target.files, idx)
                }
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {!userStory.avatar && (
                <div
                  className="
                    absolute
                    left-1/2
                    -bottom-2
                    -translate-x-1/2
                    w-5
                    h-5
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-black
                    font-bold
                    text-sm
                    border
                    shadow
                    z-20
                  "
                >
                  +
                </div>
              )}
            </>
          )}
        </div>

        {/* USER NAME */}
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
        src={base64ToImageSrc(
          currentStory.stories[currentMediaIndex].media
        )}
        alt="story"
        className="max-h-[80vh] object-contain"
      />
    </div>
  )}
</div>

  );
};

export default StorySection;
