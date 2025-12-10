// src/components/CallModal.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  PhoneIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  PhoneXMarkIcon,
} from "@heroicons/react/24/outline";

const CallModal = ({ type = "video", status = "incoming", onAccept, onReject, onEnd }) => {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  const dummyImage = "https://picsum.photos/400/600"; // receiver
  const dummyLocal = "https://picsum.photos/100/150"; // local preview

  useEffect(() => {
    if (type === "video") {
      const dummyStream = new MediaStream();
      if (localRef.current) localRef.current.srcObject = dummyStream;
      if (remoteRef.current) remoteRef.current.srcObject = dummyStream;
    }
  }, [type]);

  return (
    <div className="fixed top-20 right-4 z-50 w-80 pointer-events-auto">
      <div className="relative w-full h-[500px] bg-black rounded-xl shadow-lg overflow-hidden flex flex-col items-center p-2">
        {/* Receiver / Remote image */}
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <img
            src={dummyImage}
            alt="Receiver"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Local preview bottom-right */}
        <div className="absolute bottom-4 right-4 w-24 h-32 rounded-xl overflow-hidden border border-white bg-gray-700">
          <img
            src={dummyLocal}
            alt="You"
            className="w-full h-full object-cover"
          />
          {cameraOff && (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-white rounded-xl">
              Camera Off
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`p-3 rounded-full ${muted ? "bg-red-500" : "bg-gray-700"} text-white`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>

          {status !== "incoming" && (
            <button
              onClick={onEnd}
              className="p-3 rounded-full bg-red-600 text-white"
            >
              <PhoneXMarkIcon className="w-6 h-6" />
            </button>
          )}

          {type === "video" && status !== "incoming" && (
            <button
              onClick={() => setCameraOff(!cameraOff)}
              className={`p-3 rounded-full ${cameraOff ? "bg-red-500" : "bg-gray-700"} text-white`}
            >
              <VideoCameraSlashIcon className="w-6 h-6" />
            </button>
          )}

          {status === "incoming" && (
            <>
              <button
                onClick={onAccept}
                className="p-3 rounded-full bg-green-500 text-white"
              >
                <PhoneIcon className="w-6 h-6" />
              </button>
              <button
                onClick={onReject}
                className="p-3 rounded-full bg-red-600 text-white"
              >
                <PhoneXMarkIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;
