import React, { useRef, useState } from "react";

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

  const acceptTypes = {
    post: "image/*,video/*",
    story: "image/*,video/*",
    reels: "video/*",
  };

  const fontsMap = {
    Modern: "sans-serif",
    Poly: "cursive",
    "Noto Serif": "serif",
    "Open Sans": "'Open Sans', sans-serif",
    Literata: "Georgia, serif",
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
          <svg width="122" height="122" viewBox="0 0 122 122" fill="none">
            <circle cx="61" cy="61" r="58" stroke="#73725E" strokeWidth="5" />
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
        <div className="relative w-[420px] h-[740px] rounded-[28px] overflow-hidden bg-black">
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

          {/* ================= TEXT OVERLAY ================= */}
          {activeTool === "font" && (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="absolute top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 bg-transparent outline-none resize-none text-xl"
              style={{
                color: textColor,
                textAlign,
                fontFamily: fontsMap[fontFamily],
                backgroundColor:
                  textBg === "white"
                    ? "#fff"
                    : textBg === "black"
                    ? "#000"
                    : "transparent",
                opacity,
              }}
            />
          )}

          {/* ================= FONT SELECTOR (SCROLL FIXED) ================= */}
          {activeTool === "font" && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[320px]">
              <div className="flex gap-3 px-4 py-3 overflow-x-auto rounded-full hide-scrollbar">
                <div className="flex gap-3 w-max">
                  {Object.keys(fontsMap).map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`px-4 py-2 rounded-full text-sm shrink-0 border transition ${
                        fontFamily === font
                          ? "bg-white text-black border-white"
                          : "text-white border-white/60"
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

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <SidebarButton onClick={() => setActiveTool("font")}>
              <FontIcon />
            </SidebarButton>

            {activeTool === "font" ? (
              <>
                <SidebarButton
                  onClick={() =>
                    setTextColor(textColor === "#fff" ? "#ffcc00" : "#fff")
                  }
                >
                  🎨
                </SidebarButton>

                <SidebarButton
                  onClick={() =>
                    setTextAlign(
                      textAlign === "left"
                        ? "center"
                        : textAlign === "center"
                        ? "right"
                        : "left"
                    )
                  }
                >
                  ↔️
                </SidebarButton>

                <SidebarButton
                  onClick={() =>
                    setTextBg(
                      textBg === "transparent"
                        ? "black"
                        : textBg === "black"
                        ? "white"
                        : "transparent"
                    )
                  }
                >
                  ⬛
                </SidebarButton>

                <SidebarButton>
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                  />
                </SidebarButton>
              </>
            ) : (
              <>
                <SidebarButton>
                  <MuteIcon />
                </SidebarButton>

                <SidebarButton onClick={() => setIsMuted(!isMuted)}>
                  <AudioIcon />
                </SidebarButton>

                <SidebarButton>
                  <CropIcon />
                </SidebarButton>
              </>
            )}
          </div>
        </div>
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

/* ========= ICON SVGs (UNCHANGED) ========= */

const FontIcon = () => (
  <svg width="20" height="27" viewBox="0 0 20 27" fill="none">
    <path
      d="M16.7346 23.6866L14.9571 18.2897M14.9571 18.2897H8.55964M14.9571 18.2897L12.2338 10.0195C12.1951 9.89314 12.1292 9.78506 12.0445 9.709C11.9598 9.63293 11.86 9.59231 11.758 9.59231C11.6559 9.59231 11.5562 9.63293 11.4714 9.709C11.3867 9.78506 11.3208 9.89314 11.2821 10.0195L8.55964 18.2897M8.55964 18.2897L6.78214 23.6866"
      stroke="white"
      strokeWidth="1.07"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MuteIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      d="M21.1534 6.24082C22.0784 7.16585 22.8122 8.26403 23.3128 9.47265C23.8135 10.6813 24.0711 11.9767 24.0711 13.2849"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AudioIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      d="M10.0597 13.2391L22.1355 8.29039V5.18343"
      fill="white"
    />
  </svg>
);

const CropIcon = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
    <path
      d="M5.53316 24.3459L5.53316 14.3842"
      stroke="white"
      strokeWidth="2.66"
      strokeLinecap="round"
    />
  </svg>
);

/* ================= TOP BUTTON ================= */
const ButtonWithBg = ({ label, onClick, variant }) => (
  <button
    onClick={onClick}
    className="relative w-[314px] h-[69px] flex items-center justify-center"
  >
    {variant === "glimpse" ? (
      <svg
        width="314"
        height="69"
        viewBox="0 0 314 69"
        fill="none"
        className="absolute inset-0"
      >
        <path
          d="M30.4335 7.13382C31.9128 5.76216 33.8556 5 35.873 5H278.511"
          fill="#FFFFFF"
        />
      </svg>
    ) : (
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

    <span className="relative z-10 text-[20px] font-medium text-[#111]">
      {label}
    </span>
  </button>
);

export default Create;
