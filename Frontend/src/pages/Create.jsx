import React, { useRef, useState } from "react";

function Create() {
  const fileInputRef = useRef(null);
  const [activeType, setActiveType] = useState(null); // null initially
  const [showUploadArea, setShowUploadArea] = useState(false);

  const acceptTypes = {
    post: "image/*,video/*",
    story: "image/*,video/*",
    reels: "video/*",
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files, "Type:", activeType);
    // 👉 Next step: upload API / preview
  };

  const handleTopButtonClick = (type) => {
    setActiveType(type);
    setShowUploadArea(true); // show the upload area
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f6f4]">
      <div className="flex flex-col items-center gap-10">
        {/* TOP BUTTONS */}
        {!showUploadArea && (
          <div className="flex flex-col items-center gap-5">
            <ButtonWithBg
              label="Uploads"
              onClick={() => handleTopButtonClick("post")}
            />
            <ButtonWithBg
              label="Glimpse"
              onClick={() => handleTopButtonClick("story")}
            />
            <ButtonWithBg
              label="Loops"
              onClick={() => handleTopButtonClick("reels")}
            />
          </div>
        )}

        {/* UPLOAD AREA */}
        {showUploadArea && (
          <div className="flex flex-col items-center gap-6 mt-6">
            {/* SVG ICON */}
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
              Drag Your Photos And Videos Here
            </p>

            {/* SELECT BUTTON */}
            <button
              onClick={handleButtonClick}
              className="
                w-[277px]
                h-[50px]
                rounded-full
                bg-[#73725E]
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
              "
            >
              Select From Computer
            </button>

            {/* HIDDEN FILE INPUT */}
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptTypes[activeType]}
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* BUTTON COMPONENT */
const ButtonWithBg = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-[267px] h-[69px] flex items-center justify-center transition hover:scale-[1.01]`}
    >
      <svg
        width="267"
        height="69"
        viewBox="0 0 267 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-80"
      >
        <g filter="url(#filter0_d)">
          <rect
            x="9"
            y="5"
            width="249"
            height="51"
            rx="8"
            fill="white"
            fillOpacity="0.2"
          />
        </g>
      </svg>

      <span
        className="
          relative z-10
          font-poppins font-medium
          text-[20px] leading-[100%]
          text-[#111111]
        "
      >
        {label}
      </span>
    </button>
  );
};

export default Create;
