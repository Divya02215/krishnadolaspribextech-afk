import React, { useEffect, useState, useRef } from "react";

const StoryModal = ({ stories, startIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const DURATION = 4000; // per story

  useEffect(() => {
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / DURATION, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        if (currentIndex < stories.length - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          onClose();
        }
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, stories.length, onClose]);

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () => {
    if (currentIndex < stories.length - 1) setCurrentIndex(i => i + 1);
    else onClose();
  };

  const current = stories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col justify-center items-center z-50">
      {/* Progress bar */}
      <div className="absolute top-5 left-5 right-5 flex gap-1">
        {stories.map((_, idx) => (
          <div key={idx} className="flex-1 h-1 bg-white/30 rounded">
            <div
              className="h-1 bg-white rounded"
              style={{
                width: idx < currentIndex ? "100%" : idx === currentIndex ? `${progress*100}%` : "0%",
                transition: "width 0.05s linear"
              }}
            />
          </div>
        ))}
      </div>

      {/* Media */}
      <div className="flex-1 flex items-center justify-center">
        {current.media.endsWith(".mp4") ? (
          <video src={current.media} controls className="max-h-full max-w-full" />
        ) : (
          <img src={current.media} alt="" className="max-h-full max-w-full object-contain" />
        )}
      </div>

      {/* Controls */}
      <button onClick={goPrev} className="absolute left-3 top-1/2 text-white text-3xl">‹</button>
      <button onClick={goNext} className="absolute right-3 top-1/2 text-white text-3xl">›</button>
      <button onClick={onClose} className="absolute top-3 right-3 text-white text-2xl">×</button>

      {/* Reactions / reply */}
      <div className="absolute bottom-5 w-full px-5 flex items-center gap-2">
        <input
          type="text"
          placeholder="Send message..."
          className="flex-1 p-2 rounded bg-white/20 text-white placeholder-white"
        />
        <button className="text-white text-xl">❤️</button>
        <button className="text-white text-xl">😂</button>
      </div>
    </div>
  );
};

export default StoryModal;
