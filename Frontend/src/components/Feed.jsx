// src/pages/Feed.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";

import ShareModal from "../components/ShareModal";
import CommentsPanel from "../components/CommentsPanel";
import { LikeIcon, CommentIcon } from "../components/CustomHeartIcon";

/* ========================= REPLY FUNCTION ========================= */
const handleReplyAdd = (postId, commentIndex, reply, setPosts) => {
  setPosts((prev) =>
    prev.map((p) =>
      p.id === postId
        ? {
            ...p,
            comments: p.comments.map((c, i) =>
              i === commentIndex
                ? { ...c, replies: [...(c.replies || []), reply] }
                : c
            ),
          }
        : p
    )
  );
};

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
  const initialPosts = [
    {
      id: 1,
      type: "image",
      caption: "Some days feel like a soft reset…",
      imageUrl: "https://picsum.photos/500/400?1",
      likes: 12,
      commentsCount: 8,
      shares: 5,
      comments: [],
      liked: false,
      creator: "Johndoe_Creates",
      time: "2 Hours Ago",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      type: "video",
      caption: "Peaceful moments 🎄",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 12,
      commentsCount: 8,
      shares: 5,
      comments: [],
      liked: false,
      creator: "Johndoe_Creates",
      time: "2 Hours Ago",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      type: "image",
      caption: "Cold coffee kind of day ☕",
      imageUrl: "https://picsum.photos/500/400?3",
      likes: 12,
      commentsCount: 8,
      shares: 5,
      comments: [],
      liked: false,
      creator: "Johndoe_Creates",
      time: "2 Hours Ago",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      type: "image",
      caption: "Sleep is therapy 💤",
      imageUrl: "https://picsum.photos/500/400?4",
      likes: 12,
      commentsCount: 8,
      shares: 5,
      comments: [],
      liked: false,
      creator: "Johndoe_Creates",
      time: "2 Hours Ago",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
  id: 5,
  type: "image",
  caption: "Chasing sunsets 🌅",
  imageUrl: "https://picsum.photos/500/400?5",
  likes: 9,
  commentsCount: 4,
  shares: 2,
  comments: [],
  liked: false,
  creator: "Johndoe_Creates",
  time: "3 Hours Ago",
  avatar: "https://i.pravatar.cc/40?img=5",
},
{
  id: 6,
  type: "image",
  caption: "Weekend vibes only ✨",
  imageUrl: "https://picsum.photos/500/400?6",
  likes: 18,
  commentsCount: 11,
  shares: 6,
  comments: [],
  liked: false,
  creator: "Johndoe_Creates",
  time: "4 Hours Ago",
  avatar: "https://i.pravatar.cc/40?img=6",
},
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [activeCommentsPost, setActiveCommentsPost] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleToggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
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
              key={post.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <img
                    src={post.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{post.creator}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                {/* <button className="text-xl font-bold text-gray-600">⋯</button> */}
              </div>

              {/* MEDIA */}
              {post.type === "image" ? (
                <img
                  src={post.imageUrl}
                  className="w-full h-[240px] object-cover"
                />
              ) : (
                <div className="w-full h-[240px] bg-black flex items-center justify-center cursor-pointer">
                  <Play className="w-12 h-12 text-white" />
                </div>
              )}

              {/* DESCRIPTION + 3 DOTS */}
              <div className="flex justify-between items-start px-4 pt-3">
                <p className="text-sm text-gray-800 pr-2">
                  {post.caption}
                </p>
                <button className="text-lg font-bold text-gray-600">⋯</button>
              </div>

              {/* ACTION BUTTONS (INLINE COUNTS) */}
              <div className="flex justify-between items-center px-4 py-3 text-sm">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <LikeIcon
                      size={18}
                      fill={post.liked ? "red" : "black"}
                      onClick={() => handleToggleLike(post.id)}
                    />
                    <span>{post.likes}</span>
                  </div>

                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setActiveCommentsPost(post)}
                  >
                    <CommentIcon size={18} fill="black" />
                    <span>{post.commentsCount}</span>
                  </div>

                  <div className="flex items-center gap-1 cursor-pointer">
                    <ShareButton
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setIsShareOpen(true);
                      }}
                    />
                    <span>{post.shares}</span>
                  </div>
                </div>

                <BookmarkButton />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMENTS PANEL */}
      {activeCommentsPost && (
        <CommentsPanel
          post={activeCommentsPost}
          onClose={() => setActiveCommentsPost(null)}
          onCommentAdd={(postId, comment) =>
            setPosts((prev) =>
              prev.map((p) =>
                p.id === postId
                  ? { ...p, comments: [...p.comments, comment] }
                  : p
              )
            )
          }
          onReplyAdd={(postId, commentIndex, reply) =>
            handleReplyAdd(postId, commentIndex, reply, setPosts)
          }
        />
      )}

      {/* SHARE MODAL */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        postId={selectedPostId}
      />
    </div>
  );
};

export default Feed;
