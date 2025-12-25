import React, { useRef, useState } from "react";

/* ================= ICONS (EXACT COPY – DO NOT CHANGE) ================= */

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
        <path d="M10.5 7.5H9V16.5H10.5V7.5ZM15 7.5H13.5V16.5H15V7.5Z" fill="white" />
        <path d="M12 3C13.78 3 15.52 3.53 17 4.52C18.48 5.51 19.63 6.91 20.32 8.56C21 10.2 21.17 12.01 20.83 13.76C20.48 15.5 19.62 17.1 18.36 18.36C17.11 19.62 15.5 20.48 13.76 20.83C12.01 21.17 10.2 21 8.56 20.32C6.91 19.63 5.51 18.48 4.52 17C3.53 15.52 3 13.78 3 12Z" fill="white" />
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

/* ================= MUSIC PICKER ================= */

const MusicPicker = ({
    open,
    onClose,
    musicList,
    savedMusic,
    playingSongId,
    setPlayingSongId,
    setTempMusic,
     setShowMusicTrim,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSelectedMusic,
}) => {
    const [activeTab, setActiveTab] = useState("forYou");

    if (!open) return null;

    const togglePlay = (song) => {
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

        if (audioRef.current) audioRef.current.pause();

        const audio = new Audio(song.audio);
        audioRef.current = audio;

        audio.play();
        setPlayingSongId(song.id);
        setIsPlaying(true);

        audio.onended = () => {
            setIsPlaying(false);
            setPlayingSongId(null);
        };
    };

    const list =
        activeTab === "saved" ? (savedMusic || []) : musicList;


    return (
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
                        {activeTab === "saved" && savedMusic.length === 0 && (
                            <p className="text-center text-sm text-gray-400 py-8">
                                No saved music
                            </p>
                        )}

                        {list.map((song) => {
                            const isSaved = (savedMusic || []).some((m) => m.id === song.id);


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

                                    {/* RIGHT */}
                                    <button
                                       onClick={() => {
  setTempMusic(song);
  setShowMusicTrim(true);
  onClose();
}}

                                    >
                                        {playingSongId === song.id && isPlaying ? (
                                            <PlayingArrowIcon />
                                        ) : (
                                            <SaveIcon filled={isSaved} />
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* DONE */}
                    <div className="p-4">
                        <button
                            onClick={onClose}
                            className="w-full py-2 rounded-full bg-black text-white text-sm"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MusicPicker;
