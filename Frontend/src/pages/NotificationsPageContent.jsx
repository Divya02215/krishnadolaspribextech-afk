// src/pages/NotificationsPageContent.jsx
import React from "react";

const NotificationsPageContent = () => {
  const notifications = [
    { text: "Rahul liked your post ❤️", time: "2 min ago" },
    { text: "Kajal started following you", time: "15 min ago" },
    { text: "Pratham commented: 🔥🔥", time: "1 hour ago" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Notifications</h2>
      {notifications.map((n, i) => (
        <div key={i} className="p-3 bg-white rounded-lg shadow mb-2">
          <p>{n.text}</p>
          <span className="text-xs text-gray-500">{n.time}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPageContent;
