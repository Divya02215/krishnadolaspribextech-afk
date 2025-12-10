// src/components/MessageRequests.jsx
import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const MessageRequests = ({ requests, onAccept, onDecline }) => {
  const [requestList, setRequestList] = useState(requests || []);
  const [selected, setSelected] = useState([]);
  const [previewReq, setPreviewReq] = useState(null);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleMasterDelete = () => {
    if (selected.length === 0) return;
    selected.forEach((id) => onDecline(id));
    setRequestList(requestList.filter((req) => !selected.includes(req.id)));
    setSelected([]);
  };

  const handleAccept = (req) => {
    onAccept(req.id);
    setRequestList(requestList.filter((r) => r.id !== req.id));
    setPreviewReq(null);
  };

  const handleDecline = (req) => {
    onDecline(req.id);
    setRequestList(requestList.filter((r) => r.id !== req.id));
    setPreviewReq(null);
  };

  const dummyChat = [
    { sender: "user", text: "Hey! How are you?" },
    { sender: "me", text: "Hi! I'm good, you?" },
    { sender: "user", text: "Doing great! Want to catch up?" },
  ];

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold mb-3 border-b pb-2">Message Requests</h3>

      {previewReq ? (
        <div className="flex flex-col h-full bg-gray-50 rounded-lg p-4">
          {/* Back button */}
          <button
            onClick={() => setPreviewReq(null)}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 mb-3"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* User info */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={previewReq.avatar}
              alt={previewReq.user}
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="font-semibold">{previewReq.user}</p>
          </div>

          {/* Dummy chat */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {dummyChat.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[70%] ${
                  msg.sender === "me"
                    ? "bg-indigo-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Accept / Decline buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => handleAccept(previewReq)}
              className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Accept
            </button>
            <button
              onClick={() => handleDecline(previewReq)}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Requests list */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[70vh]">
            {requestList.map((req) => (
              <div
                key={req.id}
                className={`flex items-center justify-between p-2 rounded transition ${
                  selected.includes(req.id)
                    ? "bg-indigo-50 border border-indigo-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className="flex items-center space-x-3 flex-1 cursor-pointer"
                  onClick={() => setPreviewReq(req)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(req.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelect(req.id);
                    }}
                    className="form-checkbox text-indigo-600 h-4 w-4 rounded"
                  />
                  <img
                    src={req.avatar || `https://i.pravatar.cc/150?img=${req.id}`}
                    alt={req.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-sm font-semibold ml-2">{req.user}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewReq(req);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Bulk delete */}
          <div className="mt-auto border-t pt-3">
            <button
              className={`w-full py-2 rounded font-semibold transition ${
                selected.length > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleMasterDelete}
              disabled={selected.length === 0}
            >
              Delete Selected ({selected.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageRequests;
