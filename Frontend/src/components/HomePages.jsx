// src/components/HomePages.jsx
import React, { useState, Suspense, lazy } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TopRightNav from "./TopRightNav";
import RightSidebar from "./RightSidebar";

const Feed = lazy(() => import("./Feed"));
const NotificationPage = lazy(() => import("./NotificationPage"));
const ChatBox = lazy(() => import("./ChatBox"));

const FixedHeader = ({ setShowNotifications, setShowChat }) => (
  
  <header
  className="sticky top-0 z-20"
  style={{
    width: "534px",
    height: "101px",
    left: "453px",
    background: "#FFFFFF",
    borderBottom: "0.5px solid #73725E",
  }}
>
  <div
    className="flex items-center justify-between h-full px-6"
    style={{ width: "100%" }}
  >
    {/* Search Bar */}
    <div className="flex-grow max-w-xl">
      <SearchBar />
    </div>

    {/* Chat + Notification */}
    <TopRightNav
      setShowNotifications={setShowNotifications}
      setShowChat={setShowChat}
    />
  </div>
</header>

);

const HomePages = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const openPanel = (setter) => {
    setShowNotifications(false);
    setShowChat(false);
    setter(true);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT + RIGHT SIDEBAR */}
      <div className="flex-1 flex flex-col lg:ml-64">

        {/* FIXED HEADER */}
        <FixedHeader 
          setShowNotifications={() => openPanel(setShowNotifications)}
          setShowChat={() => openPanel(setShowChat)}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">

          {/* FEED */}
          <main className="flex-1 overflow-y-auto p-6">
            <Suspense fallback={<p>Loading Feed...</p>}>
              <Feed />
            </Suspense>
          </main>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block lg:w-80">
            <RightSidebar 
              setShowNotifications={() => openPanel(setShowNotifications)}
              setShowChat={() => openPanel(setShowChat)}
            />
          </div>

          {/* NOTIFICATIONS PANEL */}
          {showNotifications && (
            <Suspense fallback={<p>Loading Notifications...</p>}>
              <NotificationPage
                setShowNotifications={() => setShowNotifications(false)}
              />
            </Suspense>
          )}

          {/* CHAT PANEL */}
          {showChat && (
            <Suspense fallback={<p>Loading Chat...</p>}>
              <ChatBox
                setShowChat={() => setShowChat(false)}
              />
            </Suspense>
          )}

        </div>
      </div>
    </div>
  );
};

export default HomePages;
