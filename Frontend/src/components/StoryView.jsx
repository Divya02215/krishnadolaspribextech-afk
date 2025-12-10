// import React, { useEffect, useRef, useState } from "react";
// import { FiX } from "react-icons/fi";

// const StoryModal = ({ stories, currentIndex, setCurrentIndex, onClose }) => {
//   const [progress, setProgress] = useState(0);
//   const timerRef = useRef(null);
//   const story = stories[currentIndex];

//   // 5 sec timer for next story
//   useEffect(() => {
//     setProgress(0);
//     timerRef.current = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           nextStory(); // auto next
//           return 0;
//         }
//         return prev + 2; // speed
//       });
//     }, 100);

//     return () => clearInterval(timerRef.current);
//   }, [currentIndex]);

//   const nextStory = () => {
//     if (currentIndex < stories.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       onClose();
//     }
//   };

//   const prevStory = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">

//       {/* Progress Bar */}
//       <div className="w-[90%] h-1 bg-gray-700 mt-2 rounded-full">
//         <div className="h-1 bg-white rounded-full" style={{ width: `${progress}%` }} />
//       </div>

//       {/* IMAGE FULL VIEW */}
//       <div className="relative w-full h-[80%] flex items-center">
//         <img src={story.img} alt={story.name} className="w-full h-full object-contain" />

//         <div className="absolute left-0 w-[30%] h-full" onClick={prevStory} />
//         <div className="absolute right-0 w-[30%] h-full" onClick={nextStory} />

//         <button className="absolute top-5 right-5 text-white text-2xl" onClick={onClose}>
//           <FiX />
//         </button>
//       </div>

//       {/* NAME + VIEW */}
//       <p className="text-white mt-3 text-lg">{story.name} - {story.views} views</p>
//     </div>
//   );
// };

// export default StoryModal;
import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const StoryView = ({ story, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const timer = setTimeout(() => onNext(), 5000); // Auto Next after 5sec
    return () => clearTimeout(timer);
  }, [onNext]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      
      {/* Progress Bar */}
      <div className="absolute top-4 w-10/12 bg-gray-600 h-1 rounded-full overflow-hidden">
        <div className="bg-white h-full animate-progress w-full"></div>
      </div>

      {/* Close Button */}
      <button className="absolute top-4 right-4" onClick={onClose}>
        <X size={28} className="text-white" />
      </button>

      {/* Left Button */}
      <button onClick={onPrev} className="absolute left-4">
        <ChevronLeft size={32} className="text-white" />
      </button>

      {/* Story Image */}
      <img src={story.img} alt={story.name} className="rounded-xl max-h-[80vh]" />

      {/* Right Button */}
      <button onClick={onNext} className="absolute right-4">
        <ChevronRight size={32} className="text-white" />
      </button>

      {/* Name */}
      <div className="absolute bottom-10 text-white text-lg font-semibold">
        {story.name}
      </div>
    </div>
  );
};

export default StoryView;
