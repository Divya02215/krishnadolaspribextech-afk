// src/components/CommentsPanel.jsx
import React, { useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommentsPanel = ({ post, onCommentAdd, onReplyAdd, onClose }) => {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingToIndex, setReplyingToIndex] = useState(null);
  const [likedComments, setLikedComments] = useState({});

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = { user: "You", text: commentText, replies: [] };
    onCommentAdd(post.id, newComment);
    setCommentText("");
  };

  const handleAddReply = (index) => {
    if (!replyText.trim()) return;
    const newReply = { user: "You", text: replyText };
    onReplyAdd(post.id, index, newReply);
    setReplyText("");
    setReplyingToIndex(null);
  };

  const handleCommentLike = (commentId) => {
    setLikedComments((prev) => {
      const isLiked = !prev[commentId];
      return { ...prev, [commentId]: isLiked };
    });
  };

  return (
    <div className="bg-[#F8F8F8] w-[308px] max-h-[80vh] shadow-lg rounded-xl border border-gray-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-2 border-b border-gray-300 flex justify-between items-center flex-shrink-0 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-blue-500 p-1 rounded-full bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-xs truncate text-gray-800 absolute left-1/2 -translate-x-1/2">
          Comments on {post.caption}
        </h3>
        <div className="w-6 h-6"></div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs">
        {post.comments.length === 0 && (
          <p className="text-gray-500 text-center">No comments yet</p>
        )}

        {post.comments.map((c, i) => (
          <div key={i} className="pb-2 border-b border-gray-200 relative group">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 bg-gray-400 rounded-full flex-shrink-0" />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xs text-gray-800">{c.user}</p>

                  {/* Heart inside rectangle */}
                  <div className="relative">
                    <AnimatePresence>
                      {likedComments[`comment-${i}`] && (
                        <motion.div
                          key="like"
                          className="absolute inset-0 flex justify-center items-center pointer-events-none"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1.4 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Heart className="w-[18px] h-[18px] text-red-500 fill-red-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => handleCommentLike(`comment-${i}`)}
                      className={`flex items-center space-x-[4px] px-[6px] py-[2px] border rounded-md hover:bg-red-50 ${
                        likedComments[`comment-${i}`]
                          ? "bg-red-100 text-red-500 border-red-300"
                          : "bg-white text-gray-500 border-gray-300"
                      }`}
                    >
                      <Heart
                        className={`w-[14px] h-[14px] ${
                          likedComments[`comment-${i}`] ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                      {/* <span className="text-[10px] leading-[12px]">Like</span> */}
                    </button>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-xs text-gray-700">{c.text}</p>

                {/* Reply Button */}
                <div className="flex justify-start mt-1">
                  <button
                    onClick={() => setReplyingToIndex(i)}
                    className="text-blue-500 text-[10px] hover:underline"
                  >
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {c.replies.length > 0 && (
                  <div className="ml-3 mt-1 space-y-1">
                    {c.replies.map((r, ri) => (
                      <div key={ri} className="flex items-start space-x-1">
                        <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-xs text-gray-800">{r.user}</p>
                          <p className="text-xs text-gray-700">{r.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-300 p-2 flex items-center flex-shrink-0 relative">
        <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0 mr-2" />

        <div className="flex-1 relative">
          <input
            type="text"
            value={replyingToIndex !== null ? replyText : commentText}
            onChange={(e) =>
              replyingToIndex !== null ? setReplyText(e.target.value) : setCommentText(e.target.value)
            }
            placeholder={
              replyingToIndex !== null
                ? `Replying to ${post.comments[replyingToIndex].user}...`
                : "Add a comment..."
            }
            className="w-full pr-16 p-2 text-xs border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
          />

          <button
            onClick={() => {
              if (replyingToIndex !== null) {
                handleAddReply(replyingToIndex);
              } else {
                handleAddComment();
              }
            }}
            disabled={(replyingToIndex !== null ? !replyText.trim() : !commentText.trim())}
            className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 disabled:opacity-50 text-center"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;
