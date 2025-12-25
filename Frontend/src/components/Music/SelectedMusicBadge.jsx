import React from "react";

/* 🎵 Top-right music badge shown on post */
const SelectedMusicBadge = ({ music }) => {
  if (!music) return null;

  return (
    <div
      className="
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
      "
    >
      <span className="text-xs text-white font-medium max-w-[160px] truncate">
        {music.title}
      </span>

      {/* Audio Icon */}
      <svg width="20" height="20" viewBox="0 0 27 27" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0597 13.2391L20.3236 9.5511L22.1355 8.79954V8.29039C22.1355 7.0507 22.1355 6.01136 22.0381 5.18343C21.8965 4.27581 21.7315 3.74673 21.4116 3.3062C21.2132 3.02874 20.9586 2.79607 20.6645 2.62327C19.8012 2.10748 18.8404 2.144 17.8509 2.3698L11.7266 4.5326C9.11667 5.75125 8.25 6.59246 8.25 9.22568V13.9464L10.0597 13.2391Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default SelectedMusicBadge;
