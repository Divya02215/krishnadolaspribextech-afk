// src/components/ChatWindow.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperClipIcon,
  MicrophoneIcon,
  FaceSmileIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import CallModal from "./CallModal"; // Import the new call modal

const reactions = ["❤️", "😂", "😮", "😢", "👍", "👎"];

const ChatWindow = ({ chat, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hey buddy!", sender: "other", type: "text", time: "10:00 AM", reactions: [] },
  ]);

  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callType, setCallType] = useState(null);
  const [callStatus, setCallStatus] = useState(null);
  const [showReactionsMenu, setShowReactionsMenu] = useState({ visible: false, index: null });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        text: input,
        sender: "me",
        type: "text",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reactions: [],
      },
    ]);
    setInput("");
  };

  const toggleReactionMenu = (index) => {
    setShowReactionsMenu({ visible: !showReactionsMenu.visible, index });
  };

  const addReaction = (msgIndex, reaction) => {
    const newMessages = [...messages];
    if (!newMessages[msgIndex].reactions.includes(reaction)) {
      newMessages[msgIndex].reactions.push(reaction);
    }
    setMessages(newMessages);
    setShowReactionsMenu({ visible: false, index: null });
  };

  // Call Functions
  const startCall = (type, incoming = false) => {
    setCallType(type);
    setCallStatus(incoming ? "incoming" : "outgoing");
    setCallActive(true);
  };
  const acceptCall = () => setCallStatus("ongoing");
  const rejectCall = () => setCallActive(false);
  const endCall = () => setCallActive(false);

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="flex-1 bg-black bg-opacity-40" onClick={onClose}></div>

      <div className="w-[380px] h-full bg-white border-l shadow-xl flex flex-col relative">
        
        {/* HEADER */}
        <div className="p-4 flex items-center justify-between border-b bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* PROFILE IMAGE DUMMY */}
            <img
              src={chat.avatar || "https://randomuser.me/api/portraits/men/45.jpg"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <h2 className="font-semibold text-sm">{chat.user || "Unknown User"}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => startCall("audio")}>
              <PhoneIcon className="w-5 h-5 text-gray-700 hover:text-indigo-500 cursor-pointer" />
            </button>
            <button onClick={() => startCall("video")}>
              <VideoCameraIcon className="w-5 h-5 text-gray-700 hover:text-indigo-500 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => {
            const isMe = msg.sender === "me";
            return (
              <div key={i} className={`flex items-end ${isMe ? "justify-end" : "justify-start"} relative`}>
                {!isMe && (
                  <img
                    src={chat.avatar || "https://randomuser.me/api/portraits/women/65.jpg"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}

                <div className="relative">
                  <div
                    className={`text-sm px-3 py-2 rounded-lg max-w-[70%] break-words ${
                      isMe ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      toggleReactionMenu(i);
                    }}
                  >
                    {msg.text}
                    <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                  </div>

                  {showReactionsMenu.visible && showReactionsMenu.index === i && (
                    <div className="absolute bottom-full left-0 flex gap-1 p-1 bg-white border rounded shadow-lg z-20">
                      {reactions.map((r) => (
                        <button key={r} className="text-lg" onClick={() => addReaction(i, r)}>
                          {r}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.reactions?.length > 0 && (
                    <div className="absolute -bottom-3 left-0 flex gap-1 text-xs">
                      {msg.reactions.map((r, idx) => (
                        <span key={idx}>{r}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 👉 INSTAGRAM STYLE INPUT BAR 👇 */}
        <div className="p-3 border-t flex items-center gap-2 sticky bottom-0 bg-white z-10">
          <FaceSmileIcon
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => setShowEmoji(!showEmoji)}
          />

          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <PaperClipIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer mx-2" />
            <MicrophoneIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>

          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            Send
          </button>
        </div>

        {/* EMOJI PICKER */}
        {showEmoji && (
          <div className="absolute bottom-16 left-0 p-2">
            <EmojiPicker onEmojiClick={(e) => setInput(input + e.emoji)} />
          </div>
        )}
      </div>

      {/* CALL MODAL */}
      {callActive && (
        <CallModal
          type={callType}
          status={callStatus}
          onAccept={acceptCall}
          onReject={rejectCall}
          onEnd={endCall}
        />
      )}
    </div>
  );
};

export default ChatWindow;
