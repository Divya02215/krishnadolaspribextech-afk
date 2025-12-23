import React, { useEffect, useRef, useState } from "react";
import AnnaCalviMiquelon from "../Assets/Music/AnnaCalviMiquelon.mp3";
import AntonioVivaldiSummer from "../Assets/Music/AntonioVivaldiSummer.mp3";
import BillieEilish from "../Assets/Music/BillieEilish.mp3";
import BillWithersAintNoSunshine from "../Assets/Music/BillWithersAintNoSunshine.mp3";
import BitterBelief from "../Assets/Music/BitterBelief.mp3";
import BobDylanBallad from "../Assets/Music/BobDylanBallad.mp3";
import DaxCatchTheRain from "../Assets/Music/DaxCatchTheRain.mp3";




const getRandomAvatar = (id) =>
  `https://i.pravatar.cc/150?img=${(id % 70) + 1}`;

// story privacy button and svg button 

const StoryPrivacyButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-[297px] h-[68px] flex items-center justify-center translate-y-[1px]"
    >
      {/* SVG BACKGROUND */}
      <svg
        width="260"
        height="80"
        viewBox="0 0 297 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <g filter="url(#filter0_d_3064_2511)">
          <rect x="9" y="9" width="279" height="50" rx="25" fill="white" />
        </g>
      </svg>

      {/* TEXT OVERLAY */}
      <span className="relative z-10 text-[16px] font-medium text-[#73725E]">
        Story Privacy
      </span>
    </button>
  );
};

const SvgButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative
        w-[115px]
        h-[77px]
        -ml-[28px]        /* 🔥 overlaps Story Privacy */
        z-30
      "
    >
      {/* BACKGROUND */}
      <svg
        width="115"
        height="77"
        viewBox="0 0 115 77"
        fill="none"
        className="absolute inset-0"
      >
        <rect
          x="14"
          y="14"
          width="87"
          height="50"
          rx="25"
          fill="#73725E"
        />
      </svg>

      {/* CENTERED >> ICON */}
      <svg
        width="36"
        height="22"
        viewBox="0 0 36 22"
        fill="none"
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <path
          d="M2 20L10 11L2 2M14 20L22 11L14 2"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const SaveIcon = ({ filled = false }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6.2C6 5.08 6 4.52 6.218 4.092C6.40974 3.71569 6.71569 3.40974 7.092 3.218C7.52 3 8.08 3 9.2 3H14.8C15.92 3 16.48 3 16.908 3.218C17.2843 3.40974 17.5903 3.71569 17.782 4.092C18 4.52 18 5.08 18 6.2V19.505C18 19.991 18 20.234 17.899 20.367C17.8554 20.4248 17.7997 20.4725 17.7358 20.5067C17.6719 20.5409 17.6013 20.5608 17.529 20.565C17.362 20.575 17.16 20.44 16.756 20.171L12 17L7.244 20.17C6.84 20.44 6.638 20.575 6.47 20.565C6.39784 20.5606 6.32748 20.5407 6.26377 20.5065C6.20007 20.4723 6.14453 20.4247 6.101 20.367C6 20.234 6 19.991 6 19.505V6.2Z"
      fill={filled ? "#73725E" : "#FAF9F9"}
      stroke="#73725E"
      strokeWidth="1.77749"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayPauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.5004 7.49951H9.00037V16.4995H10.5004V7.49951ZM15.0004 7.49951H13.5004V16.4995H15.0004V7.49951Z" fill="white" />
    <path d="M12.0004 2.99951C13.7804 2.99951 15.5205 3.52735 17.0005 4.51629C18.4805 5.50522 19.6341 6.91083 20.3153 8.55536C20.9965 10.1999 21.1747 12.0095 20.8274 13.7553C20.4802 15.5012 19.623 17.1048 18.3643 18.3635C17.1057 19.6221 15.502 20.4793 13.7562 20.8266C12.0104 21.1738 10.2008 20.9956 8.55622 20.3144C6.91169 19.6332 5.50608 18.4797 4.51714 16.9996C3.52821 15.5196 3.00037 13.7795 3.00037 11.9995Z" fill="white" />
  </svg>
);


const PlayingArrowIcon = () => (
  <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
    <path
      d="M22.5146 14.2193L15.4047 21.3293M22.5146 14.2193L15.4047 7.10938M22.5146 14.2193L5.92472 14.2193"
      stroke="#73725E"
      strokeWidth="2.36999"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Create() {
  const fileInputRef = useRef(null);

  const [activeType, setActiveType] = useState(null);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  /* TEXT STATES */
  const [activeTool, setActiveTool] = useState(null);
  const [text, setText] = useState("Type something");
  const [fontFamily, setFontFamily] = useState("Modern");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState("center");
  const [textBg, setTextBg] = useState("transparent");
  const [opacity, setOpacity] = useState(1);
  const [activeSubTool, setActiveSubTool] = useState(null); // "font" | "color"
  const [fontSize, setFontSize] = useState(24); // px
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const textRef = useRef(null);
  const trashRef = useRef(null);
  const [isEditingText, setIsEditingText] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [storyPrivacy, setStoryPrivacy] = useState("friends");
  // "friends" | "hide" | "only"
  // demo users (replace with API later)
  const [friends] = useState([
    { id: 1, name: "Maddie", avatar: getRandomAvatar(1) },
    { id: 2, name: "Alex", avatar: getRandomAvatar(2) },
    { id: 3, name: "Sophia", avatar: getRandomAvatar(3) },
    { id: 4, name: "Chris", avatar: getRandomAvatar(4) },
    { id: 5, name: "Emma", avatar: getRandomAvatar(5) },
    { id: 6, name: "Daniel", avatar: getRandomAvatar(6) },
    { id: 7, name: "Olivia", avatar: getRandomAvatar(7) },
  ]);


  const [hiddenFrom, setHiddenFrom] = useState([]);
  const [showHideModal, setShowHideModal] = useState(false);
  const [showOnlyModal, setShowOnlyModal] = useState(false);
  const [onlyShareWith, setOnlyShareWith] = useState([]);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [savedMusic, setSavedMusic] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const musicList = [
    {
      id: 1,
      title: "Miquelon",
      artist: "Anna Calvi",
      cover: "https://picsum.photos/60?1",
      audio: AnnaCalviMiquelon,
    },
    {
      id: 2,
      title: "Summer",
      artist: "Antonio Vivaldi",
      cover: "https://picsum.photos/60?2",
      audio: AntonioVivaldiSummer,
    },
    {
      id: 3,
      title: "Billie Eilish",
      artist: "Billie Eilish",
      cover: "https://picsum.photos/60?3",
      audio: BillieEilish,
    },
    {
      id: 4,
      title: "Ain't No Sunshine",
      artist: "Bill Withers",
      cover: "https://picsum.photos/60?4",
      audio: BillWithersAintNoSunshine,
    },
    {
      id: 5,
      title: "Bitter Belief",
      artist: "Bitter Belief",
      cover: "https://picsum.photos/60?5",
      audio: BitterBelief,
    },
    {
      id: 6,
      title: "Ballad",
      artist: "Bob Dylan",
      cover: "https://picsum.photos/60?6",
      audio: BobDylanBallad,
    },
    {
      id: 7,
      title: "Catch The Rain",
      artist: "Dax",
      cover: "https://picsum.photos/60?7",
      audio: DaxCatchTheRain,
    },
  ];


  const togglePlay = (song) => {
    // If same song clicked → toggle pause/play
    if (playingSongId === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // New song clicked → stop previous + play new
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(song.audio);
    audioRef.current = audio;

    audio.play();
    setPlayingSongId(song.id);
    setIsPlaying(true);

    // Cleanup when song ends
    audio.onended = () => {
      setIsPlaying(false);
      setPlayingSongId(null);
    };
  };


  const startDrag = (e) => {
    e.preventDefault();
    setIsDraggingText(true);
    setShowTrash(true);

    const startX = e.touches ? e.touches[0].clientX : e.clientX;
    const startY = e.touches ? e.touches[0].clientY : e.clientY;

    const initialPos = { ...textPosition };

    const onMove = (moveEvent) => {
      const x = moveEvent.touches
        ? moveEvent.touches[0].clientX
        : moveEvent.clientX;
      const y = moveEvent.touches
        ? moveEvent.touches[0].clientY
        : moveEvent.clientY;

      setTextPosition({
        x: initialPos.x + (x - startX),
        y: initialPos.y + (y - startY),
      });
    };

    const onEnd = () => {
      setIsDraggingText(false);
      setShowTrash(false);

      // Check drop on trash
      if (trashRef.current && textRef.current) {
        const trashRect = trashRef.current.getBoundingClientRect();
        const textRect = textRef.current.getBoundingClientRect();

        const isOverTrash =
          textRect.bottom > trashRect.top &&
          textRect.top < trashRect.bottom &&
          textRect.left < trashRect.right &&
          textRect.right > trashRect.left;

        if (isOverTrash) {
          setText("");
          setTextPosition({ x: 0, y: 0 });
          setTextBg("transparent");   // ✅ reset background
          setTextColor("#ffffff");    // optional safe default
        }

      }

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };


  const acceptTypes = {
    post: "image/*,video/*",
    story: "image/*,video/*",
    reels: "video/*",
  };

  const fontsMap = {
    Modern: "sans-serif",
    Poly: "cursive",
    Serif: "serif",
    Mono: "monospace",
    Georgia: "Georgia",
    Arial: "Arial",
    Verdana: "Verdana",
    Tahoma: "Tahoma",
    Impact: "Impact",
    Courier: "Courier New",
  };


  /* STEP 1: CLICK TOP BUTTON */
  const handleTopButtonClick = (type) => {
    setActiveType(type);
    setShowUploadArea(true);
  };

  /* STEP 2: OPEN FILE PICKER */
  const handleSelectFromComputer = () => {
    fileInputRef.current?.click();
  };

  /* STEP 3: FILE SELECTED */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setShowUploadArea(false);
  };

  const textPayload = {
    text,
    fontFamily,
    textColor,
    textBg,
    fontSize,
    textAlign,
    position: textPosition,
  };

  const storyPayload = {
    media: previewUrl,
    textPayload,
    privacy: storyPrivacy,
  };

  const payload = {
    media: previewUrl,
    textPayload,
    privacy: storyPrivacy,
    hiddenFrom,
    onlyShareWith, // ✅ NEW
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f6f4]">
      {/* ================= EMPTY STATE ================= */}
      {!previewUrl && !showUploadArea && (
        <div className="flex flex-col gap-5">
          <ButtonWithBg
            label="Uploads"
            onClick={() => handleTopButtonClick("post")}
          />
          <ButtonWithBg
            label="Glimpse"
            variant="glimpse"
            onClick={() => handleTopButtonClick("story")}
          />
          <ButtonWithBg
            label="Loops"
            onClick={() => handleTopButtonClick("reels")}
          />
        </div>
      )}

      {/* ================= UPLOAD AREA ================= */}
      {showUploadArea && (
        <div className="flex flex-col items-center gap-6">
          <svg
            width="122"
            height="122"
            viewBox="0 0 122 122"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M90.1631 17.7917C88.7601 12.6473 84.3427 8.93142 78.7942 8.53238C72.2977 8.06471 62.6902 7.625 49.5625 7.625C36.5136 7.625 26.9467 8.05963 20.4528 8.52475C13.9537 8.98733 8.98479 13.9538 8.52221 20.4553C8.05708 26.9493 7.625 36.5187 7.625 49.5625C7.625 62.6902 8.06725 72.2952 8.53238 78.7917C8.93142 84.3401 12.6499 88.7601 17.7917 90.1605"
              stroke="#73725E"
              strokeWidth="5.62"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31.3998 43.3278C31.8623 36.8288 36.8288 31.8649 43.3303 31.3998C49.8218 30.9321 59.3911 30.5 72.4375 30.5C85.4839 30.5 95.0507 30.9346 101.545 31.3998C108.046 31.8623 113.013 36.8288 113.475 43.3303C113.94 49.8243 114.375 59.3937 114.375 72.4375C114.375 85.4839 113.94 95.0507 113.475 101.547C113.013 108.046 108.046 113.01 101.545 113.475C95.0507 113.94 85.4813 114.375 72.4375 114.375C59.3911 114.375 49.8243 113.94 43.3278 113.475C36.8288 113.013 31.8649 108.046 31.3998 101.545C30.9321 95.0533 30.5 85.4839 30.5 72.4375C30.5 59.3911 30.9346 49.8243 31.3998 43.3278Z"
              stroke="#73725E"
              strokeWidth="5.62"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M113.984 92.4881C108.252 87.115 104.122 83.5363 101.255 81.1929C97.8542 78.4098 93.3707 78.0056 89.7082 80.4482C86.8869 82.329 83.0134 85.2011 77.953 89.5448C70.4297 82.3493 65.2447 77.8277 61.8439 75.0446C58.4432 72.2615 53.9597 71.8599 50.2971 74.2999C46.1796 77.0449 39.8178 81.9046 30.8076 90.3581M81.3334 55.916C81.3334 57.9383 82.1368 59.8777 83.5667 61.3077C84.9967 62.7377 86.9361 63.541 88.9584 63.541C90.9807 63.541 92.9201 62.7377 94.3501 61.3077C95.7801 59.8777 96.5834 57.9383 96.5834 55.916C96.5834 53.8937 95.7801 51.9543 94.3501 50.5243C92.9201 49.0944 90.9807 48.291 88.9584 48.291C86.9361 48.291 84.9967 49.0944 83.5667 50.5243C82.1368 51.9543 81.3334 53.8937 81.3334 55.916Z"
              stroke="#73725E"
              strokeWidth="5.62"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-[#73725E] text-base">
            Drag your photos and videos here
          </p>

          <button
            onClick={handleSelectFromComputer}
            className="w-[277px] h-[50px] rounded-full bg-[#73725E] text-white font-medium"
          >
            Select from computer
          </button>
        </div>
      )}

      {/* ================= PREVIEW ================= */}
      {previewUrl && (
        <div className="w-full flex justify-center">
        <div
  className="
    relative
    w-[420px]
    h-[748px]
    rounded-[36px]
    overflow-hidden
    bg-black
    shadow-2xl
  "
>

         {selectedMusic && (
  <div className="
    absolute
    top-4
    right-4
    z-30
    flex
    items-center
    gap-2
    px-3
    py-1.5
    rounded-full
    bg-black/70
    backdrop-blur
  ">
    <span className="text-xs text-white font-medium max-w-[160px] truncate">
      {selectedMusic.title}
    </span>
    <AudioIcon />
  </div>
)}


          {/* MEDIA */}
          {previewUrl.includes("video") ? (
            <video
              src={previewUrl}
              autoPlay
              loop
              muted={isMuted}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}

          {selectedMusic && (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur">
              <span className="text-xs text-white font-medium max-w-[120px] truncate">
                {selectedMusic.title}
              </span>
              <AudioIcon />
            </div>
          )}


          {/* ================= RIGHT TOOLBAR ================= */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            {isEditingText ? (
              <>
                {/* 1️⃣ FONT (same icon, no change) */}
                <SidebarButton
                  onClick={() =>
                    setActiveSubTool(prev => (prev === "font" ? null : "font"))
                  }
                >
                  <FontIcon />
                </SidebarButton>

                <SidebarButton
                  onClick={() =>
                    setActiveSubTool(prev => (prev === "color" ? null : "color"))
                  }
                >
                  <ColorIcon />
                </SidebarButton>

                {/* 3️⃣ ALIGNMENT */}
                <SidebarButton
                  onClick={() =>
                    setTextAlign(
                      textAlign === "center"
                        ? "left"
                        : textAlign === "left"
                          ? "right"
                          : "center"
                    )
                  }
                >
                  <AlignIcon />
                </SidebarButton>

                {/* 4️⃣ TEXT BACKGROUND */}
                <SidebarButton
                  onClick={() => {
                    if (textBg === "transparent") {
                      setTextBg("white");
                      setTextColor("#000000");
                    } else if (textBg === "white") {
                      setTextBg("black");
                      setTextColor("#ffffff");
                    } else {
                      setTextBg("transparent");
                      setTextColor("#ffffff");
                    }
                  }}
                >
                  <TextBgIcon />
                </SidebarButton>

                {/* 5️⃣ TEXT SIZE */}
                <SidebarButton
                  onClick={() =>
                    setActiveSubTool(prev => (prev === "size" ? null : "size"))
                  }
                >
                  <TextSizeIcon />
                </SidebarButton>

              </>
            ) : (
              <>
                {/* DEFAULT TOOLBAR */}
                <SidebarButton
                  onClick={() => {
                    setActiveTool("font");
                    setActiveSubTool("font");
                    setIsEditingText(true);
                  }}
                >
                  <FontIcon />
                </SidebarButton>



                <SidebarButton onClick={() => setIsMuted(!isMuted)}>
                  <MuteIcon />
                </SidebarButton>

                <SidebarButton onClick={() => setShowAudioModal(true)}>
                  <AudioIcon />
                </SidebarButton>

                <SidebarButton>
                  <CropIcon />
                </SidebarButton>
              </>
            )}
          </div>

          {/* Music */}

          {showAudioModal && (
            <>
              {/* BACKDROP */}
              <div className="fixed inset-0 bg-black/40 z-40" />

              {/* MODAL */}
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-[534px] bg-white rounded-3xl overflow-hidden shadow-xl">

                  {/* SEARCH */}
                  <div className="px-4 py-3 border-b">
                    <input
                      placeholder="Search music"
                      className="w-full px-4 py-2 rounded-full border text-sm"
                    />
                  </div>

                  {/* TABS */}
                  <div className="flex justify-center gap-6 text-sm py-2 border-b">
                    {["forYou", "trending", "saved"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize ${activeTab === tab
                          ? "font-semibold border-b-2 border-black"
                          : "text-gray-400"
                          }`}
                      >
                        {tab.replace("You", " You")}
                      </button>
                    ))}
                  </div>

                  {/* LIST */}
                  <div className="max-h-[360px] overflow-y-auto">
                    {(activeTab === "saved" ? savedMusic : musicList).map((song) => {
                      const isSaved = savedMusic.some((m) => m.id === song.id);

                      return (
                        <div
                          key={song.id}
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                        >
                          {/* LEFT */}
                          <button
                            onClick={() => togglePlay(song)}
                            className="flex items-center gap-3 text-left"
                          >
                            <div className="relative">
                              <img
                                src={song.cover}
                                className="w-12 h-12 rounded-md object-cover"
                              />

                              {/* PLAY / PAUSE OVERLAY */}
                              {playingSongId === song.id && isPlaying && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
                                  <PlayPauseIcon />
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-medium">{song.title}</p>
                              <p className="text-xs text-gray-500">{song.artist}</p>
                            </div>
                          </button>

                          {/* RIGHT ICON */}
                          <button
                            onClick={() => {
                              setSelectedMusic(song);      // ✅ final selected song
                              setShowAudioModal(false);    // ✅ close modal
                            }}
                          >
                            {playingSongId === song.id && isPlaying ? (
                              <PlayingArrowIcon />
                            ) : (
                              <SaveIcon filled={savedMusic.some((m) => m.id === song.id)} />
                            )}
                          </button>

                        </div>

                      );
                    })}

                    {activeTab === "saved" && savedMusic.length === 0 && (
                      <p className="text-center text-sm text-gray-400 py-8">
                        No saved music
                      </p>
                    )}
                  </div>

                  {/* CLOSE */}
                  <div className="p-4">
                    <button
                      onClick={() => setShowAudioModal(false)}
                      className="w-full py-2 rounded-full bg-black text-white text-sm"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}



          {/* ================= TEXT OVERLAY ================= */}
          {(isEditingText || text) && (
            <textarea
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              className="absolute outline-none resize-none z-10 px-4 py-2 rounded-lg cursor-move"
              style={{
                fontFamily: fontsMap[fontFamily],
                color: textColor,
                textAlign,
                backgroundColor: textBg,
                fontSize: `${fontSize}px`,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${textPosition.x}px, ${textPosition.y}px)`,
              }}
            />
          )}


          {/* ================= FONT SELECTOR ================= */}
          {!isDraggingText && activeSubTool === "font" && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[260px] z-20">
              <div className="overflow-x-auto no-scrollbar bg-black/40 rounded-full">
                <div className="flex gap-3 px-4 py-3 w-max">
                  {Object.keys(fontsMap).map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`px-4 py-2 rounded-full text-sm shrink-0 border ${fontFamily === font
                        ? "bg-white text-black"
                        : "text-white border-white/50"
                        }`}
                      style={{ fontFamily: fontsMap[font] }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!isDraggingText && activeSubTool === "color" && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[260px] z-20">
              <div className="overflow-x-auto no-scrollbar bg-black/40 rounded-full">
                <div className="flex gap-3 px-4 py-3 w-max">
                  {[
                    "#ffffff",
                    "#ff0000",
                    "#ff9900",
                    "#ffee00",
                    "#33cc33",
                    "#00ccff",
                    "#3366ff",
                    "#aa00ff",
                    "#ff66cc",
                    "#000000",
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setTextColor(color)}
                      className={`w-8 h-8 rounded-full border-2 shrink-0 ${textColor === color ? "border-white" : "border-white/40"
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {isEditingText && (
            <button
              onClick={() => {
                // ❗ DO NOT reset any text state
                setIsEditingText(false);
                setActiveTool(null);
                setActiveSubTool(null);
              }}

              className="
      absolute
      top-4
      left-1/2
      -translate-x-1/2
      px-6
      py-2
      rounded-full
      bg-white
      text-black
      text-sm
      font-medium
      z-30
      shadow-md
    "
            >
              Done
            </button>
          )}


          {!isDraggingText && activeSubTool === "size" && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[260px] z-20">
              <div className="bg-black/40 rounded-full px-4 py-4">

                {/* LABEL */}
                <div className="flex justify-between text-white text-xs mb-2">
                  <span>A</span>
                  <span style={{ fontSize: 18 }}>A</span>
                </div>

                {/* SLIDER */}
                <input
                  type="range"
                  min={14}
                  max={60}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
            </div>
          )}

          {showTrash && (
            <div
              ref={trashRef}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="w-14 h-14 rounded-full bg-black/80 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6v14h8V6" />
                  <path d="M10 10v6" />
                  <path d="M14 10v6" />
                  <path d="M9 6l1-2h4l1 2" />
                </svg>
              </div>
            </div>
          )}

          {/* ================= BOTTOM ACTION BAR ================= */}
          {!isEditingText && (
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center z-20">
              <StoryPrivacyButton onClick={() => setShowPrivacyModal(true)} />
              <SvgButton onClick={() => console.log("next")} />
            </div>
          )}

          {showPrivacyModal && (
            <>
              {/* BACKDROP */}
              <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setShowPrivacyModal(false)}
              />

              {/* MODAL */}
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-[300px] bg-white rounded-2xl px-5 py-6 shadow-xl">
                  {/* TITLE */}
                  <h3 className="text-center text-[16px] font-semibold mb-4">
                    Who Can See Your Story
                  </h3>

                  {/* OPTIONS */}
                  <div className="flex flex-col gap-3">

                    {/* MY FRIENDS */}
                    <button
                      onClick={() => setStoryPrivacy("friends")}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border"
                    >
                      <span className="text-sm">My Friends</span>
                      <span
                        className={`w-4 h-4 rounded-full border ${storyPrivacy === "friends"
                          ? "border-black bg-black"
                          : "border-gray-400"
                          }`}
                      />
                    </button>

                    {/* HIDE STORY */}
                    <button
                      onClick={() => {
                        setStoryPrivacy("hide");
                        setShowPrivacyModal(false);
                        setShowHideModal(true);
                      }}

                      className="flex items-center justify-between px-4 py-3 rounded-xl border"
                    >
                      <div className="flex flex-col text-left">
                        <span className="text-sm">Hide Story From</span>
                        <span className="text-xs text-gray-400">
                          {hiddenFrom.length} Friends
                        </span>

                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border ${storyPrivacy === "hide"
                          ? "border-black bg-black"
                          : "border-gray-400"
                          }`}
                      />
                    </button>

                    {/* ONLY SHARE WITH */}
                    <button
                      onClick={() => {
                        setStoryPrivacy("only");
                        setShowPrivacyModal(false);
                        setShowOnlyModal(true);
                      }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border"
                    >

                      <div className="flex flex-col text-left">
                        <span className="text-sm">Only Share With</span>
                        <span className="text-xs text-gray-400">50 Friends</span>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border ${storyPrivacy === "only"
                          ? "border-black bg-black"
                          : "border-gray-400"
                          }`}
                      />
                    </button>
                  </div>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="mt-5 w-full flex justify-center"
                  >
                    <div className="w-9 h-9 rounded-full border flex items-center justify-center">
                      ✕
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {showHideModal && (
            <>
              {/* BACKDROP */}
              <div className="fixed inset-0 bg-black/40 z-40" />

              {/* MODAL */}
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-[320px] bg-white rounded-3xl overflow-hidden shadow-xl">

                  {/* HEADER */}
                  <div className="px-5 py-4 border-b text-center font-semibold">
                    Hide Story From
                  </div>

                  {/* FRIEND LIST */}
                  <div className="max-h-[320px] overflow-y-auto px-4 py-3">
                    {friends.map((friend) => {
                      const selected = hiddenFrom.includes(friend.id);

                      return (
                        <button
                          key={friend.id}
                          onClick={() => {
                            setHiddenFrom((prev) =>
                              selected
                                ? prev.filter((id) => id !== friend.id)
                                : [...prev, friend.id]
                            );
                          }}
                          className="w-full flex items-center justify-between py-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={friend.avatar}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <span className="text-sm">{friend.name}</span>
                          </div>

                          {selected && (
                            <div className="w-5 h-5 rounded-full bg-[#7b7a64] flex items-center justify-center text-white text-xs">
                              ✓
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SELECTED PREVIEW */}
                  {hiddenFrom.length > 0 && (
                    <div className="px-4 py-2 border-t flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {hiddenFrom.slice(0, 3).map((id) => {
                          const friend = friends.find((f) => f.id === id);
                          return (
                            <img
                              key={id}
                              src={friend?.avatar}
                              className="w-7 h-7 rounded-full border-2 border-white"
                            />
                          );
                        })}

                      </div>
                      <span className="text-xs text-gray-500">
                        {hiddenFrom.length} selected
                      </span>
                    </div>
                  )}

                  {/* DONE BUTTON */}
                  <div className="px-4 py-4">
                    <button
                      onClick={() => {
                        setShowHideModal(false);
                        setShowPrivacyModal(true);
                      }}
                      className="w-full py-3 rounded-full bg-[#7b7a64] text-white font-medium"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      )}

      {showOnlyModal && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 bg-black/40 z-40" />

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-[320px] bg-white rounded-3xl overflow-hidden shadow-xl">

              {/* HEADER */}
              <div className="px-5 py-4 border-b text-center font-semibold">
                Only Share With
              </div>

              {/* FRIEND LIST */}
              <div className="max-h-[320px] overflow-y-auto px-4 py-3">
                {friends.map((friend) => {
                  const selected = onlyShareWith.includes(friend.id);

                  return (
                    <button
                      key={friend.id}
                      onClick={() => {
                        setOnlyShareWith((prev) =>
                          selected
                            ? prev.filter((id) => id !== friend.id)
                            : [...prev, friend.id]
                        );
                      }}
                      className="w-full flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={friend.avatar}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="text-sm">{friend.name}</span>
                      </div>

                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-[#7b7a64] flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* SELECTED PREVIEW */}
              {onlyShareWith.length > 0 && (
                <div className="px-4 py-2 border-t flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {onlyShareWith.slice(0, 3).map((id) => {
                      const friend = friends.find((f) => f.id === id);
                      return (
                        <img
                          key={id}
                          src={friend?.avatar}
                          className="w-7 h-7 rounded-full border-2 border-white"
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs text-gray-500">
                    {onlyShareWith.length} selected
                  </span>
                </div>
              )}

              {/* DONE BUTTON */}
              <div className="px-4 py-4">
                <button
                  onClick={() => {
                    setShowOnlyModal(false);
                    setShowPrivacyModal(true);
                  }}
                  className="w-full py-3 rounded-full bg-[#7b7a64] text-white font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}



      {/* ================= FILE INPUT ================= */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptTypes[activeType]}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

/* ================= SIDEBAR BUTTON ================= */
const SidebarButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center"
  >
    {children}
  </button>
);

/* ========= ICON SVGs (UPDATED) ========= */

const FontIcon = () => (
  <svg width="20" height="27" viewBox="0 0 20 27" fill="none">
    <path
      d="M16.7346 23.6866L14.9571 18.2897M14.9571 18.2897H8.55964M14.9571 18.2897L12.2338 10.0195C12.1951 9.89314 12.1292 9.78506 12.0445 9.709C11.9598 9.63293 11.86 9.59231 11.758 9.59231C11.6559 9.59231 11.5562 9.63293 11.4714 9.709C11.3867 9.78506 11.3208 9.89314 11.2821 10.0195L8.55964 18.2897M8.55964 18.2897L6.78214 23.6866M5.8038 23.6866H8.14714M15.3663 23.6866H17.7096M3.68714 9.83221L2.29297 14.0275M3.68714 9.83221H8.70464L6.5688 3.401C6.53806 3.30261 6.48626 3.21858 6.4199 3.15948C6.35355 3.10038 6.27561 3.06885 6.19589 3.06885C6.11616 3.06885 6.03822 3.10038 5.97187 3.15948C5.90551 3.21858 5.85371 3.30261 5.82297 3.401L3.68714 9.83221Z"
      stroke="white"
      strokeWidth="1.07042"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MuteIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      d="M21.1534 6.24082C22.0784 7.16585 22.8122 8.26403 23.3128 9.47265C23.8135 10.6813 24.0711 11.9767 24.0711 13.2849C24.0711 14.5931 23.8135 15.8885 23.3128 17.0971C22.8122 18.3057 22.0784 19.4039 21.1534 20.3289M18.2191 9.1762C19.3087 10.2659 19.9207 11.7439 19.9207 13.2849C19.9207 14.8259 19.3087 16.3038 18.2191 17.3935M7.46817 9.13414L12.6925 3.90977C12.8086 3.79382 12.9565 3.71487 13.1174 3.6829C13.2784 3.65093 13.4452 3.66737 13.5968 3.73014C13.7484 3.79291 13.878 3.8992 13.9692 4.03559C14.0604 4.17197 14.1092 4.33233 14.1093 4.49641V22.0733C14.1092 22.2374 14.0604 22.3978 13.9692 22.5341C13.878 22.6705 13.7484 22.7768 13.5968 22.8396C13.4452 22.9023 13.2784 22.9188 13.1174 22.8868C12.9565 22.8548 12.8086 22.7759 12.6925 22.6599L7.46817 17.4356H4.98881C4.01478 17.4356 3.10272 16.8744 2.84372 15.9369C2.60619 15.0729 2.4863 14.1809 2.48731 13.2849C2.48731 12.3662 2.61128 11.4774 2.84372 10.6328C3.10272 9.69421 4.01478 9.13414 4.98881 9.13414H7.46817Z"
      stroke="white"
      strokeWidth="1.99761"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AudioIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0597 13.2391L20.3236 9.5511L22.1355 8.79954V8.29039C22.1355 7.0507 22.1355 6.01136 22.0381 5.18343C21.8965 4.27581 21.7315 3.74673 21.4116 3.3062C21.2132 3.02874 20.9586 2.79607 20.6645 2.62327C19.8012 2.10748 18.8404 2.144 17.8509 2.3698C16.8946 2.58896 15.7091 3.03392 14.2547 3.58181L11.7266 4.5326C9.11667 5.75125 8.25 6.59246 8.25 9.22568V13.9464L10.0597 13.2391Z"
      fill="white"
    />
    <path
      opacity="0.5"
      d="M8.24983 17.8532C7.6062 17.4856 6.87688 17.2947 6.13573 17.2997C3.9685 17.2997 2.21191 18.8781 2.21191 20.8251C2.21191 22.772 3.9685 24.3504 6.13573 24.3504C8.30406 24.3504 10.0606 22.772 10.0606 20.8251V13.2409L8.24983 13.9471V17.8532ZM20.3245 9.55172V15.6837C19.6809 15.3162 18.9516 15.1253 18.2104 15.1303C16.0432 15.1303 14.2866 16.7087 14.2866 18.6556C14.2866 20.6026 16.0432 22.181 18.2104 22.181C20.3788 22.181 22.1354 20.6026 22.1354 18.6556V8.80127L20.3245 9.55172Z"
      fill="white"
    />
  </svg>
);

const CropIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      d="M5.53316 24.3459L5.53316 14.3842C5.53316 10.2102 5.53316 8.12267 6.8304 6.82654C8.12764 5.5304 10.2141 5.5293 14.388 5.5293L24.3498 5.5293"
      stroke="white"
      strokeWidth="2.66348"
      strokeLinecap="round"
    />
    <path
      opacity="0.5"
      d="M21.0314 2.21094L21.0314 12.1727C21.0314 16.3466 21.0314 18.4342 19.7342 19.7303C18.4369 21.0264 16.3505 21.0275 12.1765 21.0275L2.2148 21.0275"
      stroke="white"
      strokeWidth="2.66348"
      strokeLinecap="round"
    />
    <path
      d="M13.8387 9.40186C15.4038 9.40186 16.1864 9.40186 16.6723 9.88887C17.1593 10.3748 17.1593 11.1573 17.1593 12.7224V13.8293C17.1593 15.3944 17.1593 16.1769 16.6723 16.6628C16.1864 17.1499 15.4038 17.1499 13.8387 17.1499H12.7319C11.1668 17.1499 10.3842 17.1499 9.89833 16.6628C9.41132 16.1769 9.41132 15.3944 9.41132 13.8293V12.7224C9.41132 11.1573 9.41132 10.3748 9.89833 9.88887C10.3842 9.40186 11.1668 9.40186 12.7319 9.40186H13.8387Z"
      stroke="white"
      strokeWidth="2.66348"
    />
  </svg>
);

const ColorIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* BACKGROUND CIRCLE */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8048 41.6096C32.295 41.6096 41.6096 32.295 41.6096 20.8048C41.6096 9.31462 32.295 0 20.8048 0C9.31462 0 0 9.31462 0 20.8048C0 32.295 9.31462 41.6096 20.8048 41.6096Z"
      fill="white"
      fillOpacity="0.1"
    />

    {/* MULTICOLOR ICON (CENTERED) */}
    <g transform="translate(10 10)">
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_3141_1223"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-1"
          width="23"
          height="24"
        >
          <path d="M0 -0.00195312H22.1918V22.1898H0L0 -0.00195312Z" fill="white" />
        </mask>
        <g mask="url(#mask0_3141_1223)">
          <path d="M17.7264 7.57191C17.7277 7.9615 17.6925 8.3477 17.621 8.73051C16.6963 8.25655 15.6716 8.01083 14.6325 8.0139C13.3805 8.0139 12.1544 8.36897 11.0966 9.04027C10.0394 8.3693 8.81292 8.01329 7.56074 8.0139C6.52166 8.01083 5.49694 8.25655 4.57224 8.73051C4.50079 8.34817 4.46549 7.95995 4.46683 7.57099C4.46683 2.46688 9.99166 -0.723189 14.4115 1.82887C15.4195 2.4108 16.2564 3.24782 16.8383 4.25578C17.4202 5.26374 17.7265 6.40805 17.7264 7.57191Z" fill="#66E1FF" />
          <path d="M11.0987 9.02973C10.317 9.51833 9.64697 10.1661 9.13223 10.9308C8.61749 11.6955 8.26956 12.56 8.11109 13.4681C7.19203 13.0078 6.39354 12.3386 5.77953 11.5143C5.16552 10.6899 4.75307 9.73328 4.5752 8.7209C5.59643 8.20314 6.73462 7.95949 7.87831 8.01379C9.02201 8.06809 10.132 8.41848 11.0996 9.03066" fill="#78EB7B" />
          <path d="M11.0983 20.2309C10.0435 20.9081 8.81598 21.2673 7.56245 21.2656C2.45834 21.2582 -0.723402 15.7287 1.8342 11.3126C2.47767 10.2018 3.42976 9.30177 4.57488 8.72168C4.75276 9.73406 5.16521 10.6907 5.77922 11.5151C6.39323 12.3394 7.19172 13.0085 8.11078 13.4689C7.87479 14.7653 8.03328 16.1027 8.56574 17.3081C9.0982 18.5135 9.98013 19.5313 11.0974 20.23" fill="#FFEF5E" />
          <path d="M14.0855 13.474C13.1617 13.9504 12.1373 14.1989 11.0979 14.1989C10.0585 14.1989 9.03417 13.9504 8.11035 13.474C8.26993 12.5663 8.61831 11.7022 9.13295 10.9377C9.64759 10.1731 10.317 9.52512 11.0979 9.03564C11.8788 9.52512 12.5482 10.1731 13.0629 10.9377C13.5775 11.7022 13.9259 12.5663 14.0855 13.474Z" fill="#E3E3E3" />
          <path d="M17.6239 8.72299C17.4461 9.73537 17.0336 10.692 16.4196 11.5164C15.8056 12.3407 15.0071 13.0099 14.0881 13.4702C13.9283 12.5623 13.5796 11.6981 13.0646 10.9336C12.5497 10.169 11.8799 9.52111 11.0986 9.03182C12.1562 8.36165 13.3825 8.006 14.6345 8.00638C15.6736 8.00331 16.6992 8.24902 17.6239 8.72299Z" fill="#D480FF" />
          <path d="M14.1922 14.6356C14.194 15.7542 13.9109 16.8548 13.3694 17.8336C12.8279 18.8124 12.0459 19.637 11.0973 20.2298C9.97954 19.5313 9.09712 18.5134 8.56432 17.3079C8.03151 16.1023 7.87284 14.7645 8.10884 13.4678C9.03278 13.9443 10.0573 14.1929 11.0969 14.1929C12.1365 14.1929 13.161 13.9443 14.0849 13.4678C14.1558 13.8524 14.1912 14.2414 14.1912 14.6347" fill="#C77F67" />
          <path d="M21.2623 14.6358C21.2623 16.3941 20.5638 18.0804 19.3205 19.3238C18.0772 20.5671 16.3908 21.2656 14.6325 21.2656C13.3787 21.2675 12.1508 20.9083 11.0957 20.2309C12.2133 19.5323 13.0956 18.5144 13.6282 17.3088C14.1608 16.1032 14.3194 14.7655 14.0833 13.4689C15.0025 13.0087 15.8012 12.3396 16.4153 11.5152C17.0295 10.6909 17.4421 9.73415 17.6201 8.72168C18.7167 9.2717 19.6384 10.1164 20.2818 11.1611C20.9251 12.2057 21.2647 13.4089 21.2623 14.6358Z" fill="#FF808C" />
        </g>
      </svg>
    </g>
  </svg>
);




const AlignIcon = () => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
    <path
      d="M2.77393 6.46875H19.4178M2.77393 11.092H13.8698M2.77393 15.7153H6.47256"
      stroke="white"
      strokeWidth="1.38699"
      strokeLinecap="round"
    />
  </svg>
);

const TextBgIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8048 41.6096C32.295 41.6096 41.6096 32.295 41.6096 20.8048C41.6096 9.31462 32.295 0 20.8048 0C9.31462 0 0 9.31462 0 20.8048C0 32.295 9.31462 41.6096 20.8048 41.6096Z"
      fill="white"
      fillOpacity="0.1"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4709 12.5557H28.1375C28.3806 12.5557 28.6138 12.6522 28.7857 12.8241C28.9576 12.9961 29.0542 13.2292 29.0542 13.4723V28.139C29.0542 28.3821 28.9576 28.6153 28.7857 28.7872C28.6138 28.9591 28.3806 29.0557 28.1375 29.0557H13.4709C13.2278 29.0557 12.9946 28.9591 12.8227 28.7872C12.6508 28.6153 12.5542 28.3821 12.5542 28.139V13.4723C12.5542 13.2292 12.6508 12.9961 12.8227 12.8241C12.9946 12.6522 13.2278 12.5557 13.4709 12.5557ZM21.7209 18.0557H24.9292V16.2223H16.6792V18.0557H19.8875V25.389H21.7209V18.0557Z"
      fill="white"
    />
  </svg>
);


const TextSizeIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.8048 41.6096C32.295 41.6096 41.6096 32.295 41.6096 20.8048C41.6096 9.31462 32.295 0 20.8048 0C9.31462 0 0 9.31462 0 20.8048C0 32.295 9.31462 41.6096 20.8048 41.6096Z"
      fill="white"
      fillOpacity="0.1"
    />
    <g clipPath="url(#clip0_size)">
      <path
        d="M18.17 13.5238H22.4557V15.2575H24.1895V11.79H10.4028V15.2575H12.1366V13.5238H16.4362V28.0871H13.4542V29.8209H21.152V28.0871H18.17V13.5238Z"
        fill="white"
      />
      <path
        d="M26.9087 19.0718H20.8892V22.5392H22.6229V20.8055H25.1749V28.0872H23.0667V29.8209H29.0308V28.0872H26.9087V20.8055H29.4746V22.5392H31.2083V19.0718H26.9087Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_size">
        <rect
          width="22.1918"
          height="22.1918"
          fill="white"
          transform="translate(9.70898 9.70898)"
        />
      </clipPath>
    </defs>
  </svg>
);




/* ================= TOP BUTTON ================= */
const ButtonWithBg = ({ label, onClick, variant }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-[314px] h-[69px] flex items-center justify-center"
    >
      {/* GLIMPSE BUTTON BACKGROUND */}
      {variant === "glimpse" && (
        <svg
          width="314"
          height="69"
          viewBox="0 0 314 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <g filter="url(#filter0_d)">
            <path
              d="M30.4335 7.13382C31.9128 5.76216 33.8556 5 35.873 5H278.511C280.579 5 282.567 5.8012 284.058 7.23546L302.244 24.7355C305.514 27.8826 305.514 33.1174 302.244 36.2645L284.058 53.7645C282.567 55.1988 280.579 56 278.511 56H35.873C33.8556 56 31.9128 55.2378 30.4335 53.8662L11.5607 36.3662C8.1467 33.2005 8.1467 27.7995 11.5607 24.6338L30.4335 7.13382Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="313.697"
              height="69"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* DEFAULT (UPLOADS / LOOPS) */}
      {variant !== "glimpse" && (
        <svg
          width="267"
          height="69"
          viewBox="0 0 267 69"
          fill="none"
          className="absolute left-1/2 -translate-x-1/2 opacity-80"
        >
          <rect
            x="9"
            y="5"
            width="249"
            height="51"
            rx="8"
            fill="#FFFFFF"
            fillOpacity="0.2"
          />
        </svg>
      )}

      {/* LABEL */}
      <span className="relative z-10 text-[20px] font-medium text-[#111]">
        {label}
      </span>
    </button>
  );
};


export default Create;
