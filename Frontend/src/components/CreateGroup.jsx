// src/components/CreateGroup.jsx
import React, { useState } from "react";
import { UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import GroupChatWindow from "./GroupChatWindow";

const dummyUsers = [
  { id: 1, name: "Maddie", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: 2, name: "John", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: 3, name: "Sophia", avatar: "https://i.pravatar.cc/50?img=3" },
  { id: 4, name: "Alex", avatar: "https://i.pravatar.cc/50?img=4" },
];

const CreateGroup = ({ onClose }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openGroupChat, setOpenGroupChat] = useState(false);

  const filteredUsers = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((uid) => uid !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleCreateGroup = () => {
    setOpenGroupChat(true); // OPEN GROUP CHAT WINDOW
  };

  if (openGroupChat) {
    return (
      <GroupChatWindow
        groupName={groupName}
        members={dummyUsers.filter((u) => selectedMembers.includes(u.id))}
        onClose={() => setOpenGroupChat(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="flex-1 bg-black bg-opacity-40" onClick={onClose}></div>

      <div className="w-[380px] h-full bg-white shadow-xl border-l flex flex-col p-6 overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold">Create Group</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Group Name"
          className="w-full border rounded-md px-3 py-2 mb-4 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search members"
          className="w-full border rounded-md px-3 py-2 mb-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <h4 className="text-sm font-medium text-gray-600 mb-2">
          Members ({selectedMembers.length})
        </h4>

        <div className="space-y-2 overflow-y-auto max-h-64">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-2 border rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <p className="text-sm">{user.name}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No users found.</p>
          )}
        </div>

        <button
          disabled={!groupName || selectedMembers.length === 0}
          onClick={handleCreateGroup}
          className={`w-full mt-6 flex items-center justify-center py-2 rounded-md font-medium transition ${
            groupName && selectedMembers.length > 0
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <UserGroupIcon className="w-5 h-5" />
          <span>Create Group</span>
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
