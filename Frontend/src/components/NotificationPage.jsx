// src/components/NotificationPage.jsx
import React, { useState } from "react";
import { Video, MessageSquareText } from "lucide-react"; // VIDEO & MSG ICONS

const NotificationPage = ({ setShowNotifications }) => {
  const [activeTab, setActiveTab] = useState("notifications");

  const notificationsData = [
    { type: "like", user: "Sidddarth", text: "liked your post.", time: "1h" },
    { type: "comment", user: "Aman_Gamer", text: "commented: 🔥🔥", time: "35m" },
    { type: "story_like", user: "Shrishti", others: "and 5 others", text: "liked your story.", time: "3h" },
  ];

  const followRequestsData = [
    { user: "Priya_X", img: 32, mutual: "2 mutual friends" },
    { user: "Karan_Dev", img: 45, mutual: "4 mutual friends" },
  ];

  const mentionsData = [
    { type: "mention", user: "User_A", text: "mentioned you in a post.", time: "30m", svg: true },
    { type: "mention", user: "User_B", text: "tagged you in a story.", time: "45m", img: 22 },
  ];

  const suggestionUsers = [
    { user: "Travel_vibes", img: 20 },
    { user: "FoodieLife", img: 25 },
    { user: "Nature_lover", img: 35 },
  ];

  const NotificationItem = ({ data, isMention }) => (
    <div
      className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-50 ${
        isMention ? "w-[321px] h-[60px] bg-[#FAF9F9] rounded-[14px]" : ""
      }`}
    >
      <div className="flex items-center space-x-3">
        {isMention ? (
          data.svg ? (
            <div className="w-10 h-10 rounded-full border overflow-hidden flex items-center justify-center bg-gray-200">
              <svg width="32" height="35" viewBox="0 0 39 43" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.9 31V11L19.46 1C13.30 4.33 1 11 1 11C1 11 1 24 1 31L19.47 41L37.94 31Z" fill="#D9D9D9" />
              </svg>
            </div>
          ) : (
            <img
              src={`https://i.pravatar.cc/150?img=${data.img || 10}`}
              className="w-10 h-10 rounded-full object-cover border"
            />
          )
        ) : (
          <img
            src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}

        <p className="text-sm">
          <span className="font-bold">{data.user}</span>{" "}
          <span className="text-gray-700">{data.text}</span>
        </p>
      </div>
      {data.showFollowBtn ? (
        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg">Follow</button>
      ) : (
        <span className="text-xs text-gray-400">{data.time}</span>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl p-4 z-50 overflow-y-auto border-l border-gray-200">

      {/* CLOSE BUTTON */}
      <button className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-gray-100"
        onClick={() => setShowNotifications(false)}>
        <span className="text-lg font-bold">×</span>
      </button>

    <div className="mt-8 mb-4 sticky top-0 bg-white pt-2 pb-3 border-b z-10 flex justify-between items-center px-4">
  {/* Notifications button (left side) */}
  <button
    onClick={() => setActiveTab("notifications")}
    className={`text-lg font-semibold pb-1 ${
      activeTab === "notifications" ? "border-b-2 border-black" : "text-gray-400"
    }`}
  >
    Notifications
  </button>

  {/* Mentions button (right side, icon left, text right) */}
  <button
    onClick={() => setActiveTab("mentions")}
    className={`text-lg pb-1 font-semibold flex items-center gap-2 ${
      activeTab === "mentions" ? "border-b-2 border-black" : "text-gray-400"
    }`}
  >
    {/* SVG Container */}
    <div className="relative w-[19px] h-[12px] flex items-center justify-center">
      {/* First SVG (bottom) */}
      <svg
        width="19"
        height="12"
        viewBox="0 0 19 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          d="M9.05343 6.15983C9.12789 6.09887 9.22116 6.06556 9.31739 6.06556C9.41362 6.06556 9.50689 6.09887 9.58135 6.15983L14.7422 10.3819C15.1522 10.7169 15.7043 10.8453 16.1722 10.5986C16.4659 10.4432 16.8005 10.2236 17.0951 9.92275C17.3943 9.61733 17.6118 9.27025 17.7643 8.96733C18.0009 8.49567 17.8709 7.94525 17.5226 7.549C15.2672 4.97942 12.2468 2.36692 10.2718 1.06567C9.68052 0.676085 8.9351 0.636085 8.33218 1.00734C6.35677 2.22234 3.35552 4.96817 1.11135 7.54775C0.764682 7.94567 0.634266 8.49567 0.871349 8.96733C1.02385 9.27025 1.24135 9.61733 1.54052 9.92275C1.81184 10.1936 2.1231 10.4213 2.46343 10.5978C2.93135 10.8453 3.48343 10.7169 3.89302 10.3819L9.05343 6.15983Z"
          stroke="#262511"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Second SVG (smaller, bottom positioned as per Figma) */}
      <svg
        width="17.5"
        height="4.1667"
        viewBox="0 0 19 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          top: "13.96px",
          left: "1.25px",
        }}
      >
        <path
          d="M18.2313 2.1425C18.1867 1.38167 17.5921 0.904166 16.8313 0.867083C15.6892 0.810833 13.5221 0.75 9.50004 0.75C5.47795 0.75 3.31087 0.810833 2.1692 0.866666C1.40795 0.904166 0.813369 1.38167 0.768786 2.1425C0.755716 2.37254 0.749463 2.60292 0.750036 2.83333C0.750036 3.09583 0.757119 3.325 0.768786 3.52417C0.813369 4.285 1.40795 4.7625 2.16879 4.79958C3.31087 4.85583 5.47795 4.91667 9.50004 4.91667C13.5221 4.91667 15.6892 4.85583 16.8309 4.8C17.5921 4.7625 18.1867 4.285 18.2313 3.52417C18.2432 3.32611 18.2495 3.09583 18.25 2.83333C18.25 2.57083 18.243 2.34167 18.2313 2.1425Z"
          stroke="#262511"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <span>Mentions</span>
  </button>
</div>

      

     
{activeTab === "notifications" && (
  <>
    <div className="flex items-center justify-between mt-2 mb-2">
      <p className="font-[Poppins] font-medium text-[14px] capitalize">Follow Requests [12]</p>
      <button className="text-[12px] font-medium bg-[#73725E] px-2 py-1 rounded text-white">
        View All
      </button>
    </div>

    {followRequestsData.map((user, idx) => (
      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F9] mb-2">
        <div className="flex items-center space-x-3">
          <img src={`https://i.pravatar.cc/100?img=${user.img}`} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{user.user}</p>
            <p className="text-xs text-gray-500">{user.mutual}</p>
          </div>
        </div>

       
        <div className="flex gap-2">

          <button className="w-[75px] h-[28px] bg-[#73725E] border border-gray-300 rounded-full flex items-center justify-center text-[14px] font-[Poppins] text-white">
  Confirm
</button>


         <button className="flex items-center justify-center gap-1 px-3 py-1">
  <svg width="20" height="20" viewBox="0 0 39 43" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.9 31V11L19.46 1C13.30 4.33 1 11 1 11C1 11 1 24 1 31L19.47 41L37.94 31Z" fill="#FFFFFF" />
  </svg>
  <span
    className="text-[14px] font-[Poppins] font-normal text-[#272612] leading-none"
    style={{ lineHeight: "100%" }}
  >
    Delete
  </span>
</button>


        </div>
      </div>
    ))}
  </>
)}


      {/* ───────────────────── NORMAL NOTIFICATIONS ───────────────────── */}
      {activeTab === "notifications" && (
        <>
          <h3 className="font-bold text-lg mb-3 mt-4">Activity</h3>
          {notificationsData.map((data, index) => (
            <NotificationItem key={index} data={data} />
          ))}

          <h3 className="font-bold text-lg mt-6 mb-3">Suggested For You</h3>
          {suggestionUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img src={`https://i.pravatar.cc/100?img=${user.img}`} className="w-10 h-10 rounded-full" />
                <p>{user.user}</p>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg">Follow</button>
            </div>
          ))}
        </>
      )}

      {/* ───────────────────── MENTIONS TAB ───────────────────── */}
      {activeTab === "mentions" && (
        <div>
          <h3 className="font-bold text-lg mb-3">Recent Mentions</h3>
          {mentionsData.map((data, index) => (
            <NotificationItem key={index} data={data} isMention={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
