// src/components/GroupChatWindow.jsx
import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  XMarkIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperClipIcon, 
  MicrophoneIcon,
  FaceSmileIcon, 
} from "@heroicons/react/24/outline";

const dummyMembers = [
  { id: 1, name: "Alice", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 2, name: "Bob", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
];

const initialMessages = [
  { text: "Welcome to the group! 🎉", sender: "system", type: "system" },
  { text: "Hey guys! How's it going?", sender: "other", type: "text", userId: 1 },
  { text: "Hi Alice! I'm good, thanks 😊", sender: "me", type: "text" },
  { text: "Anyone seen the latest updates?", sender: "other", type: "text", userId: 2 },
  { text: "Yes, I checked them this morning.", sender: "me", type: "text" },
  { text: "Great! Let's discuss in the meeting later.", sender: "other", type: "text", userId: 3 },
];

const GroupChatWindow = ({ groupName = "Team Chat", members = dummyMembers, onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  // Send text message
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "me", type: "text" }]);
    setInput("");
    setShowEmoji(false);
    setIsTyping(false);
  };

  // Send image
  const sendImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMessages([...messages, { text: reader.result, sender: "me", type: "image" }]);
    };
    reader.readAsDataURL(file);
  };

  // Send direct location
  const sendLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setMessages([...messages, { text: locationLink, sender: "me", type: "location" }]);
      },
      (err) => alert("Unable to fetch location: " + err.message)
    );
  };

  const handleEmojiClick = (emojiObj) => {
    setInput((prev) => prev + emojiObj.emoji);
    inputRef.current.focus();
  };

  // Get avatar for other users
  const getAvatar = (userId) => {
    const user = members.find((m) => m.id === userId);
    return user ? user.avatar : "";
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="flex-1 bg-black bg-opacity-40" onClick={onClose}></div>

      <div className="w-[380px] h-full bg-white border-l shadow-xl flex flex-col">
        {/* HEADER */}
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold">{groupName}</h2>
            <p className="text-xs text-gray-500">{members.length} members</p>
            {isTyping && <p className="text-xs text-green-500">Typing...</p>}
          </div>
          <div className="flex space-x-3 text-gray-700">
            <PhoneIcon className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
            <VideoCameraIcon className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
            <XMarkIcon
              className="w-6 h-6 cursor-pointer hover:text-red-500"
              onClick={onClose}
            />
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, i) => {
            const isMe = msg.sender === "me";
            const isSystem = msg.sender === "system";
            return (
              <div
                key={i}
                className={`flex items-end space-x-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {!isMe && !isSystem && (
                  <img
                    src={getAvatar(msg.userId)}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}

                {msg.type === "image" ? (
                  <img
                    src={msg.text}
                    alt="sent"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                ) : msg.type === "location" ? (
                  <a
                    href={msg.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 text-blue-600 px-3 py-2 rounded-lg text-sm underline max-w-[70%]"
                  >
                    📍 Shared Location
                  </a>
                ) : (
                  <div
                    className={`text-sm px-3 py-2 rounded-lg max-w-[70%] break-words ${
                      isMe
                        ? "bg-indigo-500 text-white"
                        : isSystem
                        ? "text-center text-gray-500 bg-transparent"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* EMOJI PICKER */}
        {showEmoji && (
          <div className="p-2 relative w-full flex justify-center">
            <button
              className="absolute top-1 left-3 bg-gray-200 p-1 px-2 rounded-full hover:bg-gray-300 text-sm"
              onClick={() => setShowEmoji(false)}
            >
              ←
            </button>
            <div className="border rounded-xl shadow-lg">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                height={200}
                width={330}
                searchDisabled
                skinTonesDisabled
                previewConfig={{ showPreview: false }}
                categories={[]}
              />
            </div>
          </div>
        )}

        {/* INPUT AREA */}
        <div className="p-3 border-t flex items-center space-x-2">
          <div className="flex items-center flex-1 border rounded-full px-3 py-2">
            <button className="mr-2">
              <MicrophoneIcon className="w-6 h-6 text-gray-600" />
            </button>

            <input
              ref={inputRef}
              className="flex-1 px-2 text-sm outline-none"
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button onClick={() => setShowAttachMenu(!showAttachMenu)}>
                  <PaperClipIcon className="w-6 h-6 text-gray-600" />
                </button>

                {showAttachMenu && (
                  <div className="absolute bottom-10 right-0 bg-white shadow-lg rounded-lg p-3 w-40 space-y-2">
                    <button
                      onClick={() => setShowAttachMenu(false)}
                      className="text-sm mb-2 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      ← Back
                    </button>

                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center space-x-2 text-sm hover:bg-gray-100 p-2 rounded-md"
                    >
                      📷 Gallery
                    </button>

                    <button
                      onClick={sendLocation}
                      className="flex items-center space-x-2 text-sm hover:bg-gray-100 p-2 rounded-md"
                    >
                      📍 Share Location
                    </button>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => sendImage(e.target.files[0])}
              />

              <button onClick={() => setShowEmoji(!showEmoji)}>
                <FaceSmileIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatWindow;
