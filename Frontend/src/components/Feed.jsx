// // src/pages/Feed.jsx
// import React, { useState } from "react";
// import { Play } from "lucide-react";
// import { motion } from "framer-motion";

// import ShareModal from "../components/ShareModal";
// import CommentsPanel from "../components/CommentsPanel";
// import { LikeIcon, CommentIcon } from "../components/CustomHeartIcon";

// // ========================= REPLY FUNCTION =========================
// const handleReplyAdd = (postId, commentIndex, reply, setPosts) => {
//   setPosts(prev =>
//     prev.map(p =>
//       p.id === postId
//         ? {
//             ...p,
//             comments: p.comments.map((c, i) =>
//               i === commentIndex ? { ...c, replies: [...(c.replies || []), reply] } : c
//             ),
//           }
//         : p
//     )
//   );
// };

// // ========================= SINGLE VIDEO COMPONENT =========================
// const SingleVerticalVideo = ({
//   videoUrl,
//   title,
//   post,
//   handleToggleLike,
//   openShareModal,
//   activeCommentsPost,
//   handleCommentClick,
// }) => {
//   const [showLike, setShowLike] = useState(false);
//   const lastTap = React.useRef(0);

//   const handleDoubleTap = () => {
//     const now = Date.now();
//     if (now - lastTap.current < 300) {
//       handleToggleLike(post.id);
//       setShowLike(true);
//       setTimeout(() => setShowLike(false), 800);
//     }
//     lastTap.current = now;
//   };

//   return (
//     <div className="relative w-full flex justify-center">
//       <svg width="320" height="400" viewBox="0 0 320 400" fill="none">
//         <g filter="url(#shadowBox)">
//           <rect x="10" y="10" width="300" height="380" rx="16" fill="white" />
//         </g>
//       </svg>

//       {/* VIDEO INSIDE SVG */}
//       <div className="absolute w-[300px] h-[380px] top-[10px] rounded-2xl overflow-hidden">
//         <video
//           src={videoUrl}
//           autoPlay
//           muted
//           loop
//           className="w-full h-full object-cover"
//           onClick={handleDoubleTap}
//         />
//       </div>

//       {/* Like Animation */}
//       {showLike && (
//         <motion.div
//           className="absolute inset-0 flex justify-center items-center"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1.5 }}
//           exit={{ scale: 0 }}
//           transition={{ type: "spring", stiffness: 300 }}
//         >
//           <LikeIcon size={90} fill="red" />
//         </motion.div>
//       )}

//       {/* Action Buttons */}
//       {!activeCommentsPost && (
//         <div className="absolute bottom-6 right-4 flex flex-col items-center space-y-6">
//           <LikeIcon
//             fill={post.liked ? "red" : "white"}
//             size={28}
//             onClick={() => handleToggleLike(post.id)}
//           />
//           <CommentIcon
//             fill="white"
//             size={28}
//             onClick={() => handleCommentClick(post)}
//           />
//           <ShareButton onClick={() => openShareModal(post.id)} />
//           <BookmarkButton />
//         </div>
//       )}

//       {/* Title */}
//       <div className="absolute bottom-2 left-4 text-white">
//         <p className="text-lg font-semibold">{title}</p>
//         <p className="text-sm">{post.likes} Likes</p>
//       </div>

//       <defs>
//         <filter id="shadowBox" x="0" y="0" width="320" height="400">
//           <feOffset dy="4" />
//           <feGaussianBlur stdDeviation="4.5" />
//         </filter>
//       </defs>
//     </div>
//   );
// };

// // ========================= SHARE BUTTON =========================
// const ShareButton = ({ onClick }) => (
//   <svg
//     width="15"
//     height="15"
//     className="cursor-pointer"
//     viewBox="0 0 15 15"
//     fill="none"
//     onClick={onClick}
//   >
//     <path
//       d="M8.46238 7.22377H2.51638C2.51638 7.01752 2.47363 6.81127 2.38888 6.61777L0.606125 2.58427C0.036125 1.29427 1.39963 0.00277031 2.65663 0.64102L12.9924 5.88652C14.0874 6.44152 14.0874 8.00602 12.9924 8.56102L2.65738 13.8065C1.39963 14.4448 0.036125 13.1525 0.606125 11.8633L2.38738 7.82977C2.47156 7.63884 2.51499 7.43244 2.51488 7.22377"
//       stroke="#73725E"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// // ========================= BOOKMARK BUTTON =========================
// const BookmarkButton = () => (
//   <svg width="10" height="15" className="cursor-pointer" viewBox="0 0 10 15">
//     <path
//       d="M0.470703 2.8707C0.470703 2.0307 0.470703 1.6107 0.634203 1.2897..."
//       fill="#FAF9F9"
//       stroke="#73725E"
//       strokeWidth="1"
//     />
//   </svg>
// );

// // ========================= VERTICAL VIDEO FEED =========================
// const VerticalVideoFeed = ({
//   videos,
//   handleToggleLike,
//   openShareModal,
//   onCommentClick,
//   onClose,
//   activeCommentsPost,
// }) => (
//   <div className="flex flex-col space-y-6 overflow-y-scroll h-[75vh] snap-y snap-mandatory px-4 relative">
//     <button
//       onClick={onClose}
//       className="absolute top-2 left-4 z-50 bg-black/50 text-white p-3 rounded-full"
//     >
//       X
//     </button>

//     {videos.map(post => (
//       <div key={post.id} className="snap-start flex justify-center">
//         <SingleVerticalVideo
//           videoUrl={post.videoUrl}
//           title={post.caption}
//           post={post}
//           handleToggleLike={handleToggleLike}
//           openShareModal={openShareModal}
//           activeCommentsPost={activeCommentsPost}
//           handleCommentClick={onCommentClick}
//         />
//       </div>
//     ))}
//   </div>
// );

// // ========================= MAIN FEED =========================
// const Feed = () => {
//   const initialPosts = [
//     { id: 1, type: "image", caption: "Beach Sunset 🌅", imageUrl: "https://picsum.photos/400/300?1", likes: 2, comments: [], liked: false },
//     { id: 2, type: "video", caption: "Travel Vlog ✈️", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", likes: 5, comments: [], liked: false },
//     { id: 3, type: "image", caption: "City Lights 🌃", imageUrl: "https://picsum.photos/400/300?2", likes: 1, comments: [], liked: false },
//     { id: 4, type: "video", caption: "Cooking Time 🍳", videoUrl: "https://www.w3schools.com/html/movie.mp4", likes: 0, comments: [], liked: false },
//   ];

//   const [posts, setPosts] = useState(initialPosts);
//   const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
//   const [activeCommentsPost, setActiveCommentsPost] = useState(null);
//   const [isShareOpen, setIsShareOpen] = useState(false);
//   const [selectedPostId, setSelectedPostId] = useState(null);

//   const videoPosts = posts.filter(p => p.type === "video");

//   const openReel = index => {
//     const videoIndex = videoPosts.findIndex(v => v === posts[index]);
//     setSelectedVideoIndex(videoIndex);
//   };

//   const handleToggleLike = id => {
//     setPosts(prev =>
//       prev.map(p =>
//         p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
//       )
//     );
//   };

//   return (
//     <div className="relative w-full max-w-[620px] mx-auto px-4 mt-4">
      
//       <div className={`${activeCommentsPost ? "blur-sm pointer-events-none" : ""}`}>
//         {selectedVideoIndex !== null ? (
//           <VerticalVideoFeed
//             videos={videoPosts}
//             handleToggleLike={handleToggleLike}
//             activeCommentsPost={activeCommentsPost}
//             onCommentClick={setActiveCommentsPost}
//             onClose={() => setSelectedVideoIndex(null)}
//             openShareModal={(id) => {
//               setSelectedPostId(id);
//               setIsShareOpen(true);
//             }}
//           />
//         ) : (
//           <>
//             <h2 className="text-lg font-bold text-center mb-3">Feed</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {posts.map((post, index) => (
//                 <div key={post.id} className="relative rounded-xl overflow-hidden">

//                   {/* IMAGE CARD */}
//                   {post.type === "image" ? (
//                     <div className="relative flex justify-center">
//                       <svg width="320" height="400">
//                         <rect x="10" y="10" width="300" height="380" rx="16" fill="white" />
//                       </svg>
//                       <img
//                         src={post.imageUrl}
//                         className="absolute top-[10px] w-[300px] h-[380px] object-cover rounded-xl"
//                       />
//                     </div>
//                   ) : (
//                     <div
//                       onClick={() => openReel(index)}
//                       className="relative flex justify-center cursor-pointer"
//                     >
//                       <svg width="320" height="400">
//                         <rect x="10" y="10" width="300" height="380" rx="16" fill="white" />
//                       </svg>
//                       <div className="absolute top-[10px] w-[300px] h-[380px] bg-black flex justify-center items-center rounded-xl">
//                         <Play className="w-14 h-14 text-white" />
//                       </div>
//                     </div>
//                   )}

//                   {/* ACTIONS */}
//                   <div className="p-2 flex justify-between items-center">
//                     <LikeIcon
//                       size={20}
//                       fill={post.liked ? "red" : "black"}
//                       onClick={() => handleToggleLike(post.id)}
//                     />
//                     <CommentIcon size={20} fill="black" onClick={() => setActiveCommentsPost(post)} />
//                     <ShareButton onClick={() => {
//                       setSelectedPostId(post.id);
//                       setIsShareOpen(true);
//                     }} />
//                     <BookmarkButton />
//                   </div>

//                   <p className="px-2">{post.caption}</p>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* COMMENTS PANEL */}
//       {activeCommentsPost && (
//         <CommentsPanel
//           post={activeCommentsPost}
//           onClose={() => setActiveCommentsPost(null)}
//           onCommentAdd={(postId, comment) =>
//             setPosts(prev =>
//               prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
//             )
//           }
//           onReplyAdd={(postId, commentIndex, reply) =>
//             handleReplyAdd(postId, commentIndex, reply, setPosts)
//           }
//         />
//       )}

//       {/* SHARE MODAL */}
//       <ShareModal
//         isOpen={isShareOpen}
//         onClose={() => setIsShareOpen(false)}
//         postId={selectedPostId}
//       />
//     </div>
//   );
// };

// export default Feed;




// src/pages/Feed.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

import ShareModal from "../components/ShareModal";
import CommentsPanel from "../components/CommentsPanel";
import { LikeIcon, CommentIcon } from "../components/CustomHeartIcon";

// ========================= REPLY FUNCTION =========================
const handleReplyAdd = (postId, commentIndex, reply, setPosts) => {
  setPosts(prev =>
    prev.map(p =>
      p.id === postId
        ? {
            ...p,
            comments: p.comments.map((c, i) =>
              i === commentIndex ? { ...c, replies: [...(c.replies || []), reply] } : c
            ),
          }
        : p
    )
  );
};

// ========================= SHARE BUTTON =========================
const ShareButton = ({ onClick }) => (
  <svg
    width="15"
    height="15"
    className="cursor-pointer"
    viewBox="0 0 15 15"
    fill="none"
    onClick={onClick}
  >
    <path
      d="M8.46238 7.22377H2.51638C2.51638 7.01752 2.47363 6.81127 2.38888 6.61777L0.606125 2.58427C0.036125 1.29427 1.39963 0.00277031 2.65663 0.64102L12.9924 5.88652C14.0874 6.44152 14.0874 8.00602 12.9924 8.56102L2.65738 13.8065C1.39963 14.4448 0.036125 13.1525 0.606125 11.8633L2.38738 7.82977C2.47156 7.63884 2.51499 7.43244 2.51488 7.22377"
      stroke="#73725E"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ========================= BOOKMARK BUTTON =========================
const BookmarkButton = () => (
  <svg width="15" height="20" className="cursor-pointer" viewBox="0 0 15 20">
    <path
      d="M3 0H12C13.1046 0 14 0.895431 14 2V20L7.5 16L1 20V2C1 0.895431 1.89543 0 3 0Z"
      fill="#FAF9F9"
      stroke="#73725E"
      strokeWidth="1"
    />
  </svg>
);

// ========================= SINGLE VIDEO COMPONENT =========================
const SingleVerticalVideo = ({
  videoUrl,
  title,
  post,
  handleToggleLike,
  openShareModal,
  activeCommentsPost,
  handleCommentClick,
}) => {
  const [showLike, setShowLike] = useState(false);
  const lastTap = React.useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleToggleLike(post.id);
      setShowLike(true);
      setTimeout(() => setShowLike(false), 800);
    }
    lastTap.current = now;
  };

  return (
    <div className="relative w-full flex justify-center">
      {/* VIDEO CARD */}
      <div className="absolute w-[300px] h-[380px] top-[10px] rounded-2xl overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          onClick={handleDoubleTap}
        />
      </div>

      {/* LIKE ANIMATION */}
      {showLike && (
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LikeIcon size={90} fill="red" />
        </motion.div>
      )}

      {/* ACTION BUTTONS */}
      {!activeCommentsPost && (
        <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4">
          <LikeIcon fill={post.liked ? "red" : "white"} size={28} onClick={() => handleToggleLike(post.id)} />
          <CommentIcon fill="white" size={28} onClick={() => handleCommentClick(post)} />
          <ShareButton onClick={() => openShareModal(post.id)} />
          <BookmarkButton />
        </div>
      )}

      {/* TITLE */}
      <div className="absolute bottom-2 left-4 text-white">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm">{post.likes} Likes</p>
      </div>
    </div>
  );
};

// ========================= VERTICAL VIDEO FEED =========================
const VerticalVideoFeed = ({ videos, handleToggleLike, openShareModal, onCommentClick, onClose, activeCommentsPost }) => (
  <div className="flex flex-col space-y-4 overflow-y-auto h-[75vh] snap-y snap-mandatory px-2 relative">
    <button
      onClick={onClose}
      className="absolute top-2 left-2 z-50 bg-black/50 text-white p-2 rounded-full"
    >
      X
    </button>

    {videos.map(post => (
      <div key={post.id} className="snap-start flex justify-center">
        <SingleVerticalVideo
          videoUrl={post.videoUrl}
          title={post.caption}
          post={post}
          handleToggleLike={handleToggleLike}
          openShareModal={openShareModal}
          activeCommentsPost={activeCommentsPost}
          handleCommentClick={onCommentClick}
        />
      </div>
    ))}
  </div>
);

// ========================= MAIN FEED =========================
const Feed = () => {
  const initialPosts = [
    { id: 1, type: "image", caption: "Beach Sunset 🌅", imageUrl: "https://picsum.photos/400/300?1", likes: 2, comments: [], liked: false },
    { id: 2, type: "video", caption: "Travel Vlog ✈️", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", likes: 5, comments: [], liked: false },
    { id: 3, type: "image", caption: "City Lights 🌃", imageUrl: "https://picsum.photos/400/300?2", likes: 1, comments: [], liked: false },
    { id: 4, type: "video", caption: "Cooking Time 🍳", videoUrl: "https://www.w3schools.com/html/movie.mp4", likes: 0, comments: [], liked: false },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [activeCommentsPost, setActiveCommentsPost] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const videoPosts = posts.filter(p => p.type === "video");

  const openReel = index => {
    const videoIndex = videoPosts.findIndex(v => v === posts[index]);
    setSelectedVideoIndex(videoIndex);
  };

  const handleToggleLike = id => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
   <div
  className="relative overflow-y-auto"
  style={{
    width: "550px",
    height: "900px",
    position: "absolute",
    top: "114px",
    left: "465px",
    opacity: 1,
  }}
>
  <div className={`${activeCommentsPost ? "blur-sm pointer-events-none" : ""}`}>
    {selectedVideoIndex !== null ? (
      <VerticalVideoFeed
        videos={videoPosts}
        handleToggleLike={handleToggleLike}
        activeCommentsPost={activeCommentsPost}
        onCommentClick={setActiveCommentsPost}
        onClose={() => setSelectedVideoIndex(null)}
        openShareModal={(id) => {
          setSelectedPostId(id);
          setIsShareOpen(true);
        }}
      />
    ) : (
      <>
        {/* Alternating Image/Video Grid */}
        <div className="grid grid-cols-2 gap-2">
          {posts.map((post, index) => (
            <div key={post.id} className="relative rounded-xl overflow-hidden">
              {post.type === "image" ? (
                <img
                  src={post.imageUrl}
                  className="w-[320px] h-[260px] object-cover rounded-xl"
                />
              ) : (
                <div
                  onClick={() => openReel(index)}
                  className="w-[320px] h-[260px] bg-black flex justify-center items-center rounded-xl cursor-pointer"
                >
                  <Play className="w-10 h-10 text-white" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-1 flex justify-between items-center">
                <LikeIcon
                  size={16}
                  fill={post.liked ? "red" : "black"}
                  onClick={() => handleToggleLike(post.id)}
                />
                <CommentIcon
                  size={16}
                  fill="black"
                  onClick={() => setActiveCommentsPost(post)}
                />
                <ShareButton
                  onClick={() => {
                    setSelectedPostId(post.id);
                    setIsShareOpen(true);
                  }}
                />
                <BookmarkButton />
              </div>

              <p className="px-1 text-xs">{post.caption}</p>
            </div>
          ))}
        </div>
      </>
    )}
  </div>

  {/* COMMENTS PANEL */}
  {activeCommentsPost && (
    <CommentsPanel
      post={activeCommentsPost}
      onClose={() => setActiveCommentsPost(null)}
      onCommentAdd={(postId, comment) =>
        setPosts(prev =>
          prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
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
