// src/components/HomePages.jsx
import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TopRightNav from "./TopRightNav";
import RightSidebar from "./RightSidebar";

import NotificationPage from "./NotificationPage";
import ChatBox from "./ChatBox";

const HEADER_HEIGHT = 80;

/**
 * FIXED HEADER
 */
const FixedHeader = ({ onNotifications, onChat }) => {
  return (
    <header
      className="sticky top-0 z-30 bg-[#F7F7F2]"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="w-full h-full flex">
        <div className="bg-white h-[56px] w-full flex items-center px-4 relative">
          
          {/* CENTERED SEARCH BAR */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <SearchBar />
          </div>

          {/* RIGHT NAV */}
          <div className="ml-auto flex items-center">
            <TopRightNav
              setShowNotifications={onNotifications}
              setShowChat={onChat}
            />
          </div>

        </div>
      </div>
    </header>
  );
};


const HomePages = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const openPanel = (panel) => {
    setShowNotifications(false);
    setShowChat(false);
    panel(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      {/* ⬅️ ONLY CHANGE IS HERE */}
      <div className="grid grid-cols-[280px_1fr_360px]">

        {/* LEFT SIDEBAR */}
        <aside
          className="bg-white sticky top-0 h-screen flex flex-col"
          style={{
            borderStyle: "solid",
            borderColor: "#73725E",
            borderWidth: "0px 0.5px 0px 0.5px",
          }}
        >
          <div style={{ height: HEADER_HEIGHT }} />
          <div className="flex-1 overflow-y-auto px-6 pt-6">
            <Sidebar />
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <section className="flex flex-col h-screen w-full">
          <FixedHeader
            onNotifications={() => openPanel(setShowNotifications)}
            onChat={() => openPanel(setShowChat)}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="w-full px-8 pb-10">
              <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside
          className="bg-white sticky top-0 h-screen flex flex-col"
          style={{
            borderStyle: "solid",
            borderColor: "#73725E",
            borderWidth: "0px 0.5px 0px 0.5px",
          }}
        >
          <div style={{ height: HEADER_HEIGHT }} />
          <div className="flex-1 overflow-y-auto px-6 pt-6">
            <RightSidebar
              setShowNotifications={() => openPanel(setShowNotifications)}
              setShowChat={() => openPanel(setShowChat)}
            />
          </div>
        </aside>
      </div>

      {/* OVERLAYS */}
      {showNotifications && (
        <NotificationPage
          setShowNotifications={() => setShowNotifications(false)}
        />
      )}

      {showChat && (
        <ChatBox setShowChat={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default HomePages;
