// src/components/HomePages.jsx
import React, { useState, Suspense, lazy } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TopRightNav from "./TopRightNav";
import RightSidebar from "./RightSidebar";

const Feed = lazy(() => import("./Feed"));
const NotificationPage = lazy(() => import("./NotificationPage"));
const ChatBox = lazy(() => import("./ChatBox"));

/**
 * FIXED HEADER – exact height used for alignment
 */
const HEADER_HEIGHT = 80;

/**
 * FIXED HEADER – aligned with feed column
 */
const FixedHeader = ({ onNotifications, onChat }) => {
  return (
   <header
  className="sticky top-0 z-30 bg-[#F7F7F2]"
  style={{ height: HEADER_HEIGHT }}
>
  {/* FULL WIDTH CONTAINER */}
  <div className="w-full h-full flex">
    <div
      className="bg-white h-[56px] w-full flex items-center gap-4 px-4"
      style={{ border: "0.5px solid #73725E" }}
    >
      {/* SEARCH BAR */}
      <SearchBar />

      {/* RIGHT ICONS */}
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


/**
 * HOME PAGE – SIDEBAR ALIGNMENT FIXED
 */
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
      {/* 3 COLUMN GRID */}
      <div className="grid grid-cols-[353px_1fr_353px]">

        {/* LEFT SIDEBAR */}
        <aside
          className="bg-white sticky top-0 h-screen flex flex-col"
          style={{
            borderStyle: "solid",
            borderColor: "#73725E",
            borderWidth: "0px 0.5px 0px 0.5px",
          }}
        >
          {/* HEADER SPACER – CRITICAL FIX */}
          <div style={{ height: HEADER_HEIGHT }} />

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 pt-6">
            <Sidebar />
          </div>
        </aside>

        {/* CENTER FEED */}
        <section className="flex flex-col min-h-screen">
          <FixedHeader
            onNotifications={() => openPanel(setShowNotifications)}
            onChat={() => openPanel(setShowChat)}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[900px] px-2 pb-10">
              <Suspense fallback={<p>Loading feed...</p>}>
                <Feed />
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
          {/* HEADER SPACER – MATCHES LEFT */}
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
        <Suspense fallback={<p>Loading notifications...</p>}>
          <NotificationPage
            setShowNotifications={() => setShowNotifications(false)}
          />
        </Suspense>
      )}

      {showChat && (
        <Suspense fallback={<p>Loading chat...</p>}>
          <ChatBox setShowChat={() => setShowChat(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default HomePages;
