// src/pages/MessagesPage.jsx
import React, { useState } from "react";
import StorySection from "../components/StorySection";
import ChatBox from "./ChatBox";

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const contacts = [
    { id: 1, name: "Pratham", avatar: "https://i.pravatar.cc/50?img=20" },
    { id: 2, name: "Kajal", avatar: "https://i.pravatar.cc/50?img=22" },
    { id: 3, name: "Rahul", avatar: "https://i.pravatar.cc/50?img=25" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StorySection />

      <div className="flex flex-1">
        {/* LEFT SIDE CONTACTS */}
        <div className="w-1/3 border-r bg-white">
          <h2 className="p-4 font-bold text-lg border-b">Messages</h2>
          {contacts.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedChat(c)}
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
            >
              <img src={c.avatar} className="w-10 h-10 rounded-full mr-3" />
              <p>{c.name}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE CHAT BOX */}
        <div className="flex-1">
          {selectedChat ? (
            <ChatBox chat={selectedChat} />
          ) : (
            <div className="flex items-center h-full justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
