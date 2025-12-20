import React from "react";
import StorySection from "./StorySection";
import { HeartIcon } from "@heroicons/react/24/outline";

const RightSidebar = ({ setShowNotifications, setShowChat }) => {
  return (
    <div className="h-full flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="pt-10 pb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">
          Glimpse
        </h2>

        <div className="flex items-center gap-4">
          {/* CHAT ICON */}
          <button
            onClick={() => setShowChat(true)}
            className="relative flex items-center justify-center p-3 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-110 transition-all"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.07687 16.0806C4.09614 15.8793 4.07076 15.6762 4.00254 15.4859C3.93433 15.2955 3.82497 15.1225 3.68225 14.9793C2.22475 13.5163 1.375 11.6435 1.375 9.625C1.375 5.236 5.5055 1.375 11 1.375C16.4945 1.375 20.625 5.236 20.625 9.625C20.625 14.014 16.4945 17.875 11 17.875C10.0307 17.8774 9.06534 17.7516 8.129 17.501C7.80172 17.4133 7.45358 17.4495 7.15138 17.6028C6.61925 17.8723 5.44637 18.3865 3.52962 18.8306C3.7968 17.9329 3.98 17.0123 4.07687 16.0806Z"
                  fill="#73725E"
                />
              </svg>
              <HeartIcon className="absolute w-3 h-3 text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </button>

          {/* AUDIO / NOTIFICATION ICON */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative flex items-center justify-center p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 hover:scale-110 transition-all"
          >
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M15.5833 4.58333V10.0833C17.1417 10.0833 18.3333 8.89167 18.3333 7.33333C18.3333 5.775 17.1417 4.58333 15.5833 4.58333ZM8.25 3.66667H1.83333C0.825 3.66667 0 4.49167 0 5.5V9.16667C0 10.175 0.825 11 1.83333 11H2.75V13.75C2.75 14.7583 3.575 15.5833 4.58333 15.5833H6.41667V11H8.25L11.9167 14.6667H13.75V0H11.9167L8.25 3.66667Z"
                fill="#73725E"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 overflow-y-auto space-y-14 pb-14">
        <StorySection
          setShowNotifications={setShowNotifications}
          setShowChat={setShowChat}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
