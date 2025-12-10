import React, { useState, useCallback } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const storiesData = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: `Leo Park ${i + 1}`,
  profilePic: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  status: i % 2 === 0 ? 'Story' : 'Recent',
}));

const StoryShareList = ({ onShare }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openUserId, setOpenUserId] = useState(null); // click toggle
  const [messages, setMessages] = useState({}); 

  const toggleSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleStoryClick = (userId) => {
    setOpenUserId(prev => prev === userId ? null : userId); // toggle panel
    toggleSelect(userId); // optional: select on click
  };

  const handleSendClick = useCallback((userId) => {
    const name = storiesData.find((u) => u.id === userId).name.split(' ')[0];
    const msg = messages[userId] || '';
    const shareDetail = `Shared to: ${name}${msg ? ` with message: "${msg}"` : ''}`;
    onShare(shareDetail);
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    setMessages((prev) => ({ ...prev, [userId]: '' }));
    setOpenUserId(null); // close panel after sending
  }, [messages, onShare]);

  return (
    <div className="py-3 px-4 bg-white border-t border-gray-100 shadow-lg h-[400px]">
      <div className="grid grid-cols-6 gap-4 overflow-y-auto h-[320px] scrollbar-hide">
        {storiesData.map((user) => {
          const isSelected = selectedUsers.includes(user.id);
          const borderColor = isSelected
            ? 'border-blue-500'
            : user.status === 'Story'
            ? 'border-pink-500'
            : 'border-gray-300';

          return (
            <div
              key={user.id}
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => handleStoryClick(user.id)}
            >
              <div
                className={`relative w-[60px] h-[60px] rounded-full p-0.5 border-4 ${borderColor} transition-transform duration-150 ${
                  isSelected ? 'scale-105' : ''
                }`}
                style={{ backgroundColor: '#D9D9D9' }}
              >
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {isSelected && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="white"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                )}
              </div>

              <span className="text-xs font-medium text-gray-700 mt-1 truncate max-w-[60px]">
                {user.name.split(' ')[0]}
              </span>

              {/* --- Click Panel --- */}
              {openUserId === user.id && user.status === 'Story' && (
                <div className="absolute bottom-[70px] flex flex-col space-y-1 w-[130px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    className="text-xs px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={messages[user.id] || ''}
                    onChange={(e) =>
                      setMessages((prev) => ({ ...prev, [user.id]: e.target.value }))
                    }
                  />
                  <button
                    onClick={() => console.log('Create Group for', user.id)}
                    className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                  >
                    Create Group
                  </button>
                  <button
                    onClick={() => handleSendClick(user.id)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Send Separately
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Send Button */}
      <div className="flex justify-end mt-3">
        <button
          className={`flex items-center space-x-1 px-5 py-2 text-white rounded-full transition-all duration-300 ${
            selectedUsers.length > 0
              ? 'bg-blue-500 hover:bg-blue-600 shadow-md'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={selectedUsers.length === 0}
          onClick={() => {
            selectedUsers.forEach((userId) => handleSendClick(userId));
          }}
        >
          <span>Send ({selectedUsers.length})</span>
          <PaperAirplaneIcon className="w-4 h-4 transform -rotate-45" />
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default StoryShareList;
