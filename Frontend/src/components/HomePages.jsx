import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TopRightNav from "./TopRightNav";
import RightSidebar from "./RightSidebar";

import NotificationPage from "./NotificationPage";
import ChatBox from "./ChatBox";

/* ================= CENTER HEADER ================= */
const FixedHeader = ({ onNotifications, onChat }) => {
  return (
    <header
      className="flex items-center justify-center border-b border-[#E5E5DD] flex-shrink-0"
      style={{ height: 80, width: 534, background: "#fff" }}
    >
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      <div className="pr-6">
        <TopRightNav
          setShowNotifications={onNotifications}
          setShowChat={onChat}
        />
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
    <div className="h-screen bg-[#F7F7F2] overflow-hidden">
      {/* ================= MAIN EDGE-TO-EDGE LAYOUT ================= */}
      <div className="flex w-full h-full">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="flex-1 bg-white border-r border-[#73725E]">
          <div className="h-full flex justify-center">
            <div className="w-[280px]">
              <Sidebar />
            </div>
          </div>
        </aside>

        {/* ================= CENTER COLUMN (SCROLLS) ================= */}
        <section className="flex flex-col items-center h-full overflow-y-auto">
          {/* HEADER (SCROLLS NOW) */}
          <FixedHeader
            onNotifications={() => openPanel(setShowNotifications)}
            onChat={() => openPanel(setShowChat)}
          />

          {/* CONTENT */}
          <main className="w-[534px]">
            <div className="px-8 py-6 box-border min-h-full">
              <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </section>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="flex-1 bg-white border-l border-[#73725E]">
          <div className="h-full flex justify-center">
            <div className="w-[280px]">
              <RightSidebar
                setShowNotifications={() => openPanel(setShowNotifications)}
                setShowChat={() => openPanel(setShowChat)}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* ================= OVERLAYS ================= */}
      {showNotifications && (
        <NotificationPage
          setShowNotifications={() => setShowNotifications(false)}
        />
      )}

      {showChat && <ChatBox setShowChat={() => setShowChat(false)} />}
    </div>
  );
};

export default HomePages;
