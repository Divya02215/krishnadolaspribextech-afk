import React, { useEffect, useState } from "react";
import axios from "axios";
import { Play } from "lucide-react";

import ShareModal from "../components/ShareModal";
import CommentsPanel from "../components/CommentsPanel";
import { LikeIcon, CommentIcon } from "../components/CustomHeartIcon";

/* ========================= SHARE BUTTON ========================= */
const ShareButton = ({ onClick }) => (
  <svg
    width="16"
    height="16"
    className="cursor-pointer"
    viewBox="0 0 15 15"
    fill="none"
    onClick={onClick}
  >
    <path
      d="M8.46238 7.22377H2.51638C2.51638 7.01752 2.47363 6.81127 2.38888 6.61777L0.606125 2.58427C0.036125 1.29427 1.39963 0.00277031 2.65663 0.64102L12.9924 5.88652C14.0874 6.44152 14.0874 8.00602 12.9924 8.56102L2.65738 13.8065C1.39963 14.4448 0.036125 13.1525 0.606125 11.8633L2.38738 7.82977"
      stroke="#000"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ========================= BOOKMARK BUTTON ========================= */
const BookmarkButton = () => (
  <svg width="14" height="18" viewBox="0 0 15 20" className="cursor-pointer">
    <path
      d="M3 0H12C13.1046 0 14 0.895431 14 2V20L7.5 16L1 20V2C1 0.895431 1.89543 0 3 0Z"
      fill="#fff"
      stroke="#000"
      strokeWidth="1"
    />
  </svg>
);

/* ========================= MAIN FEED ========================= */
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [activeCommentsPost, setActiveCommentsPost] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  /* ========================= FETCH FEED ========================= */
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/feed/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load feed", err);
      }
    };

    fetchFeed();
  }, []);

  /* ========================= LIKE TOGGLE (UI ONLY FOR NOW) ========================= */
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  return (
    <div className="w-full bg-[#fafafa]">
      <div className={`${activeCommentsPost ? "blur-sm pointer-events-none" : ""}`}>
        <div className="grid grid-cols-3 gap-4 p-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex items-center gap-2 px-3 py-2">
                <img
                  src={post.creator?.avatar}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <div>
                  <p className="text-sm font-semibold">
                    {post.creator?.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* MEDIA */}
              {post.type === "image" ? (
                <img
                  src={post.media}
                  className="w-full h-[240px] object-cover"
                  alt=""
                />
              ) : (
                <div className="w-full h-[240px] bg-black flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              )}

              {/* CAPTION */}
              {post.caption && (
                <p className="px-4 pt-3 text-sm">{post.caption}</p>
              )}

              {/* ACTIONS */}
              <div className="flex justify-between items-center px-4 py-3 text-sm">
                <div className="flex gap-10">
                  <div className="flex gap-1 cursor-pointer">
                    <LikeIcon
                      size={18}
                      fill={post.likedByMe ? "red" : "black"}
                      onClick={() => handleToggleLike(post._id)}
                    />
                    {post.likes || 0}
                  </div>

                  <div
                    className="flex gap-1 cursor-pointer"
                    onClick={() => setActiveCommentsPost(post)}
                  >
                    <CommentIcon size={18} fill="black" />
                    {post.commentsCount || 0}
                  </div>

                  <div className="flex gap-1 cursor-pointer">
                    <ShareButton
                      onClick={() => {
                        setSelectedPostId(post._id);
                        setIsShareOpen(true);
                      }}
                    />
                    {post.shares || 0}
                  </div>
                </div>

                <BookmarkButton />
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCommentsPost && (
        <CommentsPanel
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
        />
      )}

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        postId={selectedPostId}
      />
    </div>
  );
};

export default Feed;
