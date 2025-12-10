// src/components/ChatBox.jsx
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import CreateGroup from "./CreateGroup";
import MessageRequests from "./MessageRequests";
import { InboxIcon, UsersIcon } from "@heroicons/react/24/outline";

const initialChats = [
  { id: 1, user: "Pratham", message: "Where are you bro?", time: "2m", unread: true },
  { id: 2, user: "Sid_x", message: "Send that reel 🔥", time: "10m", unread: false },
];

const initialRequests = [
  { id: 1, user: "NewUser1", avatar: "https://i.pravatar.cc/150?img=55" },
  { id: 2, user: "NewUser2", avatar: "https://i.pravatar.cc/150?img=56" },
];

const ChatBox = ({ setShowChat }) => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [activeSection, setActiveSection] = useState("chat"); 
  const [messageRequests, setMessageRequests] = useState(initialRequests);

  const handleAccept = (req) => {
    setChats([
      ...chats,
      {
        id: chats.length + 1,
        user: req.user,
        message: "New chat started",
        time: "Now",
        unread: true,
      },
    ]);
    setMessageRequests(messageRequests.filter((r) => r.id !== req.id));
    setSelectedChat({
      id: chats.length + 1,
      user: req.user,
    });
    setActiveSection("chat");
  };

  const handleDecline = (id) => {
    setMessageRequests(messageRequests.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-4 z-50 flex flex-col border-l">

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded-full font-semibold text-gray-700 hover:bg-red-500 hover:text-white transition"
        onClick={() => setShowChat(false)}
      >
        ✖
      </button>

      {/* HEADER */}
      <div className="flex justify-between mt-8 mb-3 items-center">
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="flex space-x-3 items-center">
          <button
            className={`p-2 rounded-full hover:bg-gray-200 ${activeSection === "requests" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("requests")}
            title="Message Requests"
          >
            <InboxIcon className="w-5 h-5 text-gray-600" />
          </button>

          <button
            className={`p-2 rounded-full hover:bg-gray-200 ${activeSection === "group" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("group")}
            title="Create Group"
          >
            <UsersIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto mt-2">
        {activeSection === "requests" && (
          <MessageRequests
            requests={messageRequests}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}

        {activeSection === "group" && showGroupModal && (
          <CreateGroup onClose={() => setShowGroupModal(false)} />
        )}

        {activeSection === "chat" && (
          <>
            {/* Search */}
            <input
              type="text"
              placeholder="Search people and messages"
              className="w-full py-2 px-4 text-sm border rounded-full mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="space-y-3">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://i.pravatar.cc/150?img=${chat.id + 10}`}
                      className="w-12 h-12 rounded-full object-cover"
                      alt="profile"
                    />
                    <div>
                      <p className="font-semibold text-sm">{chat.user}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[170px]">{chat.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.unread && <span className="mt-1 w-2 h-2 bg-blue-600 rounded-full"></span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* OPEN CHAT WINDOW */}
      {selectedChat && activeSection === "chat" && (
        <ChatWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
      )}

      {/* GROUP BUTTON */}
      {activeSection === "group" && !showGroupModal && (
        <button
          className="mt-2 w-full py-2 bg-indigo-500 text-white rounded-lg"
          onClick={() => setShowGroupModal(true)}
        >
          Create New Group
        </button>
      )}
    </div>
  );
};

export default ChatBox;
