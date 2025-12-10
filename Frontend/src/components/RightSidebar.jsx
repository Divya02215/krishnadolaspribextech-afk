// src/components/RightSidebar.jsx
import React from "react";
import StorySection from "./StorySection";

const RightSidebar = ({ setShowNotifications, setShowChat }) => {
  return (
    <div
      className="fixed top-0 right-0 h-full flex flex-col bg-white z-30"
      style={{
        width: "353px",
        background: "#FFFFFF",
        borderStyle: "solid",
        borderColor: "#73725E",
        borderWidth: "0px 0.5px 0px 0.5px",
      }}
    >

      {/* Header (optional like Sidebar) */}
      <div
        className="flex items-center h-16 p-4"
        style={{
          borderBottom: "0.5px solid #73725E",
        }}
      >
        <h2 className="text-lg font-semibold text-gray-700">
          Stories
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <StorySection
          setShowNotifications={setShowNotifications}
          setShowChat={setShowChat}
        />
      </div>

      {/* Footer */}
      <div
        className="mt-auto p-4"
        style={{
          borderTop: "0.5px solid #73725E",
        }}
      >
        
      </div>
    </div>
  );
};

export default RightSidebar;
