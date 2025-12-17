import React, { useState } from "react";
import { Search } from "lucide-react";
import StoryShareList from "./StoryShareList";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const ShareModal = ({ isOpen, onClose, postId }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [commonMessage, setCommonMessage] = useState("");

  if (!isOpen) return null;

  const handleSend = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/share-post/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        recipients: selectedUsers,
        message: commonMessage,
      }),
    });

    setSelectedUsers([]);
    setCommonMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-[28px] w-full max-w-[1200px] px-8 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH */}
        <div className="flex justify-center my-4">
          <div className="relative w-[312px] h-[53px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73725E]" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Anything"
              className="w-full h-full pl-12 pr-4 text-sm"
            />
          </div>
        </div>

        <StoryShareList
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />

        {selectedUsers.length > 0 ? (
          <div className="mt-6 flex flex-col items-center gap-4">
            <input
              placeholder="Write a message..."
              value={commonMessage}
              onChange={(e) => setCommonMessage(e.target.value)}
              className="w-[320px] px-4 py-2 border rounded-full text-sm"
            />

            {/* SEND BUTTON */}
            <button
              className="flex items-center justify-center gap-[10px]
                         w-[277px] px-[95px] py-[7px]
                         bg-[#73725E] text-white rounded-full"
              onClick={handleSend}
            >
              <span className="text-sm font-medium">Send</span>
              <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
            </button>
          </div>
        ) : (
          <div className="mt-6 flex justify-center gap-12 text-[#73725E]">
            <div className="text-xs">Add to Story</div>
            <div className="text-xs">Download</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
