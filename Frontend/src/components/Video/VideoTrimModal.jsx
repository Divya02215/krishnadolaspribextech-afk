import React, { useEffect, useRef, useState } from "react";

const MIN_DURATION = 2;   // seconds
const MAX_DURATION = 30;  // seconds
const TIMELINE_WIDTH = 394;
const TIMELINE_HEIGHT = 44;
const HANDLE_WIDTH = 20;

const VideoTrimModal = ({ open, video, onBack, onConfirm }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const dragStartX = useRef(0);
  const dragStartLeft = useRef(0);

  const [duration, setDuration] = useState(0);
  const [startPx, setStartPx] = useState(40);
  const [endPx, setEndPx] = useState(200);
  const [dragging, setDragging] = useState(null); // left | right | center
  const [isPlaying, setIsPlaying] = useState(false);

  /* ================= LOAD VIDEO ================= */
  useEffect(() => {
    if (!video) return;

    const vid = videoRef.current;
    if (!vid) return;

    const onLoaded = () => {
      setDuration(vid.duration);
      const maxPx = (MAX_DURATION / vid.duration) * TIMELINE_WIDTH;
      setStartPx(40);
      setEndPx(40 + maxPx);
    };

    vid.addEventListener("loadedmetadata", onLoaded);
    return () => vid.removeEventListener("loadedmetadata", onLoaded);
  }, [video]);

  /* ================= DRAGGING ================= */
  useEffect(() => {
    if (!dragging || !duration) return;

    const onMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(TIMELINE_WIDTH, x));

      const minPx = (MIN_DURATION / duration) * TIMELINE_WIDTH;
      const maxPx = (MAX_DURATION / duration) * TIMELINE_WIDTH;

      if (dragging === "left") {
        const next = Math.min(x, endPx - minPx);
        if (endPx - next <= maxPx) setStartPx(next);
      }

      if (dragging === "right") {
        const next = Math.max(x, startPx + minPx);
        if (next - startPx <= maxPx) setEndPx(next);
      }

      if (dragging === "center") {
        const delta = x - dragStartX.current;
        let newStart = dragStartLeft.current + delta;
        let width = endPx - startPx;

        newStart = Math.max(0, Math.min(TIMELINE_WIDTH - width, newStart));
        setStartPx(newStart);
        setEndPx(newStart + width);
      }
    };

    const stop = () => {
      setDragging(null);
      playPreview();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
    };
  }, [dragging, startPx, endPx, duration]);

  /* ================= PLAY PREVIEW ================= */
  const startTime = (startPx / TIMELINE_WIDTH) * duration;
  const endTime = (endPx / TIMELINE_WIDTH) * duration;

  const playPreview = () => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.currentTime = startTime;
    vid.play();
    setIsPlaying(true);

    const stopAtEnd = () => {
      if (vid.currentTime >= endTime) {
        vid.pause();
        vid.removeEventListener("timeupdate", stopAtEnd);
        setIsPlaying(false);
      }
    };

    vid.addEventListener("timeupdate", stopAtEnd);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      playPreview();
    }
  };

  if (!open || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] bg-white rounded-3xl px-6 py-6">

        {/* VIDEO PREVIEW */}
        <div className="relative rounded-xl overflow-hidden mb-4">
          <video
            ref={videoRef}
            src={video.url}
            className="w-full h-[220px] object-cover"
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            {!isPlaying && (
              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                ▶
              </div>
            )}
          </button>
        </div>

        {/* TIMELINE */}
        <div
          ref={containerRef}
          className="relative mx-auto mb-4"
          style={{ width: TIMELINE_WIDTH, height: TIMELINE_HEIGHT }}
        >
          {/* BACKGROUND */}
          <div className="absolute inset-0 bg-[#EEECDC] rounded-md" />

          {/* ORANGE SELECTION */}
          <div
            className="absolute top-0 h-full bg-[#F59700]/25 border-[3px] border-[#F59700] rounded-md cursor-grab"
            style={{
              left: startPx,
              width: endPx - startPx,
            }}
            onMouseDown={(e) => {
              dragStartX.current =
                e.clientX - containerRef.current.getBoundingClientRect().left;
              dragStartLeft.current = startPx;
              setDragging("center");
            }}
          />

          {/* LEFT HANDLE */}
          <div
            className="absolute top-0 h-full cursor-ew-resize"
            style={{
              left: startPx - HANDLE_WIDTH / 2,
              width: HANDLE_WIDTH,
            }}
            onMouseDown={() => setDragging("left")}
          />

          {/* RIGHT HANDLE */}
          <div
            className="absolute top-0 h-full cursor-ew-resize"
            style={{
              left: endPx - HANDLE_WIDTH / 2,
              width: HANDLE_WIDTH,
            }}
            onMouseDown={() => setDragging("right")}
          />
        </div>

        {/* TIME INFO */}
        <p className="text-xs text-center text-gray-400 mb-4">
          {Math.round(endTime - startTime)}s selected (min {MIN_DURATION}s, max {MAX_DURATION}s)
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              onConfirm({
                ...video,
                trimStart: startTime,
                trimEnd: endTime,
              })
            }
            className="w-full py-3 rounded-full bg-[#7b7a64] text-white"
          >
            Next
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-full border"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTrimModal;
