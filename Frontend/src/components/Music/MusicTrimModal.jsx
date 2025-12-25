import React, { useEffect, useRef, useState } from "react";

const MIN_DURATION = 2;
const MAX_DURATION = 30; // seconds
const WAVE_WIDTH = 394;
const WAVE_HEIGHT = 72.62;
const HANDLE_WIDTH = 28;

const MusicTrimModal = ({ open, music, onBack, onConfirm }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dragStartX = useRef(0);
const dragStartLeft = useRef(0);

  const audioRef = useRef(null);
  const scrollRef = useRef(null);
  const containerRef = useRef(null); // ✅ FIX: THIS WAS MISSING


  const [duration, setDuration] = useState(0);
  const [startPx, setStartPx] = useState(40);
  const [endPx, setEndPx] = useState(160);
  const [dragging, setDragging] = useState(null); // "left" | "right"

  /* ================= LOAD AUDIO ================= */
  useEffect(() => {
    if (!music) return;

    const audio = new Audio(music.audio);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);

      const maxPx = (MAX_DURATION / audio.duration) * WAVE_WIDTH;
      setStartPx(40);
      setEndPx(40 + maxPx);
    };

    return () => audio.pause();
  }, [music]);

  useEffect(() => {
  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
}, []);


  /* ================= DRAGGING ================= */
 useEffect(() => {
  if (!dragging || !duration) return;

  const onMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;

    x = Math.max(0, Math.min(WAVE_WIDTH, x));

    const maxPx = (MAX_DURATION / duration) * WAVE_WIDTH;
    const minPx = (MIN_DURATION / duration) * WAVE_WIDTH;

    // LEFT HANDLE
    if (dragging === "left") {
      const nextStart = Math.min(x, endPx - minPx);
      if (endPx - nextStart <= maxPx) {
        setStartPx(nextStart);
      }
    }

    // RIGHT HANDLE
    if (dragging === "right") {
      const nextEnd = Math.max(x, startPx + minPx);
      if (nextEnd - startPx <= maxPx) {
        setEndPx(nextEnd);
      }
    }

    // 🔥 CENTER DRAG (MOVE WHOLE WINDOW)
    if (dragging === "center") {
      const delta = x - dragStartX.current;
      let newStart = dragStartLeft.current + delta;
      let newEnd = newStart + (endPx - startPx);

      // Clamp inside waveform
      if (newStart < 0) {
        newStart = 0;
        newEnd = endPx - startPx;
      }
      if (newEnd > WAVE_WIDTH) {
        newEnd = WAVE_WIDTH;
        newStart = WAVE_WIDTH - (endPx - startPx);
      }

      setStartPx(newStart);
      setEndPx(newEnd);
    }
  };

  const stop = () => {
    setDragging(null);
    playPreview(); // ▶️ preview selected part
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", stop);

  return () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", stop);
  };
}, [dragging, startPx, endPx, duration]);




  /* ================= INFINITE LOOP SCROLL ================= */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = WAVE_WIDTH;

    const onScroll = () => {
      if (el.scrollLeft <= 0) el.scrollLeft = WAVE_WIDTH;
      if (el.scrollLeft >= WAVE_WIDTH * 2) el.scrollLeft = WAVE_WIDTH;
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (!open || !music) return null;

  const startTime = (startPx / WAVE_WIDTH) * duration;
  const endTime = (endPx / WAVE_WIDTH) * duration;

  const playPreview = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = startTime;
  audioRef.current.play();
  setIsPlaying(true);

  const stopAtEnd = () => {
    if (audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", stopAtEnd);
      setIsPlaying(false);
    }
  };

  audioRef.current.addEventListener("timeupdate", stopAtEnd);
};

const pausePreview = () => {
  if (!audioRef.current) return;
  audioRef.current.pause();
  setIsPlaying(false);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] bg-white rounded-3xl px-6 py-7">

        {/* COVER */}
        <div className="flex flex-col items-center mb-6">
          <img src={music.cover} className="w-16 h-16 rounded-md mb-2" />

          {/* MUSIC INFO BLOCK */}
          <div className="flex items-center gap-3 mt-3 mb-6 px-4 py-3 rounded-full border border-[#E6E4D7]">
            {/* PLAY ICON */}
           <div
  className="w-8 h-8 rounded-full border border-[#8C8B75] 
             flex items-center justify-center cursor-pointer"
  onClick={() => {
    if (isPlaying) {
      pausePreview();
    } else {
      playPreview();
    }
  }}
>
  {isPlaying ? (
    // ⏸ PAUSE ICON
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="2" y="1.5" width="3" height="9" fill="#8C8B75" />
      <rect x="7" y="1.5" width="3" height="9" fill="#8C8B75" />
    </svg>
  ) : (
    // ▶️ PLAY ICON
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 1.5V10.5L10 6L2 1.5Z" fill="#8C8B75" />
    </svg>
  )}
</div>


            {/* TEXT */}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-[#6F6E58]">
                {music.title}
              </span>
              <span className="text-xs text-[#9A9985]">
                || {music.artist}
              </span>
            </div>
          </div>
        </div>

        {/* WAVEFORM */}
        <div
          ref={containerRef}
          className="relative mx-auto mb-4 select-none"
          style={{ width: WAVE_WIDTH, height: WAVE_HEIGHT }}
        >
          {/* FULL GRAY WAVE — SINGLE SVG */}
          <svg
            width={WAVE_WIDTH}
            height={WAVE_HEIGHT}
            viewBox="0 0 398 58"
            fill="none"
          >
            {/* LEFT + RIGHT MAIN WAVE */}
            <path
              d="M119.366 2.75265L94.0497 20.5625C92.8846 21.3822 91.2857 21.1727 90.371 20.0806L78.2347 5.58928C77.3501 4.53294 75.8188 4.29747 74.6576 5.03921L57.7743 15.8241C56.7428 16.483 55.3994 16.3782 54.4826 15.5673L39.5968 2.40115C38.5136 1.44306 36.8724 1.49128 35.8473 2.5113L17.9497 20.3202C16.976 21.2889 15.4357 21.3876 14.3465 20.5509L6.12404 14.2353V52.7592H392.979V22.5117L375.076 16.2258H349.194L332.232 4.90288L312.511 15.7977L293.741 2.45889L275.003 20.0417L248.322 2.6769L234.288 22.0123"
              stroke="#D6D4B5"
              strokeWidth="3.4"
              fill="none"
            />

            {/* 🔥 CENTER WAVE (YOUR SVG — NOW GRAY) */}
            <g transform="translate(114 -4)">
              <svg width="128" height="23" viewBox="0 0 118 23" fill="none">
                <path
                  d="M0.669434 7.36843L22.0489 19.335C23.1511 19.9519 24.5321 19.7358 25.3932 18.8118L40.8326 2.24294C42.001 0.989089 44.0205 1.10289 45.0407 2.48006L57.1508 18.8287C58.0633 20.0605 59.8087 20.3046 61.0241 19.3703L68.1249 13.9117C69.4641 12.8822 71.4068 13.2972 72.2084 14.7841L74.5375 19.1043C74.9696 19.9056 75.7713 20.4402 76.6772 20.5309L81.5566 21.0197C81.8951 21.0536 82.2369 21.0242 82.5646 20.933L93.1572 17.9859C93.9335 17.7699 94.5755 17.2232 94.9125 16.4912L97.1973 11.5273C97.9423 9.90855 100.01 9.41986 101.401 10.5336L116.85 19.7007"
                  stroke="#D6D4B5"
                  strokeWidth="2.74115"
                  fill="none"
                />
              </svg>
            </g>

            {/* BARS — FULL WIDTH */}
            {Array.from({ length: 60 }).map((_, i) => (
              <rect
                key={i}
                x={i * 6.6}
                y={28}
                width="2.736"
                height="23.294"
                rx="1.368"
                fill="#D6D4B5"
                fillOpacity="0.28"
              />
            ))}
          </svg>



          {/* ORANGE SELECTION */}
          <div
            className="absolute top-0 z-20 cursor-grab"
            onMouseDown={(e) => {
    dragStartX.current = e.clientX - containerRef.current.getBoundingClientRect().left;
    dragStartLeft.current = startPx;
    setDragging("center");
  }}
            style={{
              left: startPx,
              width: endPx - startPx,
              height: WAVE_HEIGHT,
              border: "5.48px solid #F59700",
              borderRadius: "4.11px",
              boxSizing: "border-box",
              overflow: "hidden",
              boxShadow: dragging ? "0 0 0 9999px rgba(0,0,0,0.04)" : "none",
            }}
          >
            <svg
              width={WAVE_WIDTH}
              height={WAVE_HEIGHT}
              viewBox={`-${startPx} 0 398 58`}
              fill="none"
            >
              <path
                d="M119.366 2.75265L94.0497 20.5625C92.8846 21.3822 91.2857 21.1727 90.371 20.0806L78.2347 5.58928C77.3501 4.53294 75.8188 4.29747 74.6576 5.03921L57.7743 15.8241C56.7428 16.483 55.3994 16.3782 54.4826 15.5673L39.5968 2.40115C38.5136 1.44306 36.8724 1.49128 35.8473 2.5113L17.9497 20.3202C16.976 21.2889 15.4357 21.3876 14.3465 20.5509L6.12404 14.2353V52.7592H392.979V22.5117L375.076 16.2258H349.194L332.232 4.90288L312.511 15.7977L293.741 2.45889L275.003 20.0417L248.322 2.6769L234.288 22.0123"
                stroke="#F59700"
                strokeWidth="3.4"
                fill="none"
              />

              {Array.from({ length: 60 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 6.6}
                  y={28}
                  width="2.736"
                  height="23.294"
                  rx="1.368"
                  fill="#F59700"
                  fillOpacity="0.8"
                />
              ))}
            </svg>
          </div>

          {/* LEFT HANDLE */}
          <div
            className="absolute top-0 z-30 cursor-ew-resize"
            style={{
              left: startPx - HANDLE_WIDTH / 2,
              width: HANDLE_WIDTH,
              height: WAVE_HEIGHT,
            }}
            onMouseDown={() => setDragging("left")}
          />

          {/* RIGHT HANDLE */}
          <div
            className="absolute top-0 z-30 cursor-ew-resize"
            style={{
              left: endPx - HANDLE_WIDTH / 2,
              width: HANDLE_WIDTH,
              height: WAVE_HEIGHT,
            }}
            onMouseDown={() => setDragging("right")}
          />
        </div>

        {/* TIME */}
        <p className="text-xs text-center text-gray-400 mb-6">
          {Math.round(endTime - startTime)}s selected (max {MAX_DURATION}s)
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              onConfirm({
                ...music,
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

export default MusicTrimModal;
