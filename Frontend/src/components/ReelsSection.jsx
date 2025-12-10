// // src/components/ReelsSection.jsx

// import React, { useState } from 'react';
// import { Play, X } from 'lucide-react'; 

// // --- 1. ReelItem (Grid View) ---

// const ReelItem = ({ title, videoUrl, onClick }) => {
//   return (
//     <div
//       // h-96 (384px) का उपयोग करें
//       className="bg-gray-200 h-96 rounded-xl relative overflow-hidden flex items-center justify-start cursor-pointer" 
//       onClick={onClick} 
//     >
//       {/* Thumbnail image */}
//       <img
//         src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
//         alt={title}
//         className="w-full h-full object-cover"
//       />
//       {/* Play button overlay: bg-black जोड़ा गया */}
//       <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//         <Play className="w-10 h-10 text-white fill-current" />
//       </div>

//       <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">{title}</span>
//     </div>
//   );
// };

// // --- 2. SingleReel (Video Player) ---

// const SingleReel = ({ title, videoUrl, onClose }) => (
//   // w-full h-full का उपयोग करें, bg-black हटाया
//   <div className="w-full h-full relative flex justify-center items-center">
//     
//     {/* Video Player */}
//     <video
//       src={videoUrl}
//       controls
//       autoPlay
//       loop
//       className="h-full max-w-full object-contain" 
//     />

//     {/* Close Button (स्टाइलिंग और साइज़ ठीक किया गया) */}
//     <button 
//         onClick={onClose} 
//         className="absolute top-4 right-4 z-20 p-2 bg-gray-900 bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition"
//     >
//         <X className="w-6 h-6" />
//     </button>
//     
//     {/* Title/Overlay */}
//     <span className="absolute bottom-4 left-4 text-white text-lg font-bold z-10">{title}</span>
//   </div>
// );

// // --- 3. VerticalReelView (Scrolling Container) ---

// const VerticalReelView = ({ reels, initialIndex, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   
//   return (
//     // 💡 FIX: 'fixed inset-0' को 'absolute top-0 left-0 w-full h-full' से बदला गया
//     // 💡 BG: बैकग्राउंड को 'bg-white' किया गया
//     <div className="absolute top-0 left-0 w-full h-full z-50 bg-white overflow-y-scroll snap-y snap-mandatory">
//       
//       {reels.map((reel, index) => (
//         // w-full h-full का उपयोग करें
//         <div key={index} className="w-full h-full snap-start"> 
//           <SingleReel 
//             {...reel} 
//             onClose={onClose} 
//           />
//         </div>
//       ))}
//       
//     </div>
//   );
// };


// // --- 4. ReelsSection (Controller Component) ---
// const ReelsSection = () => {
//   const [selectedReelIndex, setSelectedReelIndex] = useState(null);

//   const reels = [
//     { title: 'Travel Vlog', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', },
//     { title: 'Cooking Guide', videoUrl: 'https://www.w3schools.com/html/movie.mp4', },
//     { title: 'Nature Walk', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', },
//     { title: 'Street Food', videoUrl: 'https://www.w3schools.com/html/movie.mp4', },
//   ];
//   
//   const handleClose = () => {
//     setSelectedReelIndex(null);
//   };

//   if (selectedReelIndex !== null) {
//     return (
//       <VerticalReelView 
//         reels={reels} 
//         initialIndex={selectedReelIndex} 
//         onClose={handleClose} 
//       />
//     );
//   }

//   return (
//     <div className="mb-8">
//       <h3 className="text-xl font-bold mb-4">Reels</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {reels.map((reel, index) => (
//           <ReelItem 
//             key={index} 
//             {...reel} 
//             onClick={() => setSelectedReelIndex(index)} 
//           />
//         ))}
//         </div>
//     </div>
//   );
// };

// export default ReelsSection;