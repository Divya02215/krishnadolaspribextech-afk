// // import React, { useEffect, useState } from "react";
// // import { PlusIcon } from "@heroicons/react/24/outline";
// // import axios from "axios";
// // import SuggestedUsers from "./SuggestedUsers";

// // const StorySection = () => {
// //   const [stories, setStories] = useState([]);
// //   const [uploading, setUploading] = useState(false);

// //   // Fetch stories from backend
// //   const fetchStories = async () => {
// //     try {
// //       const res = await axios.get("http://127.0.0.1:8000/api/accounts/story/", {
// //         withCredentials: true,
// //       });

// //       if (Array.isArray(res.data.stories)) {
// //         const apiStories = res.data.stories.map((story) => ({
// //           id: story.id,
// //           user: story.username || "User",
// //           avatar: story.user_avatar || story.media || "https://i.pravatar.cc/150?img=1",
// //           isOwn: false,
// //           created_at: story.created_at,
// //           caption: story.caption || "",
// //         }));

// //         setStories(apiStories);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch stories:", err);

// //       // fallback dummy stories
// //       setStories([
// //         { id: 0, user: "Your Story", avatar: "https://i.pravatar.cc/150?img=9", isOwn: true },
// //         { id: 1, user: "Pratham", avatar: "https://i.pravatar.cc/150?img=10" },
// //         { id: 2, user: "Sid_x", avatar: "https://i.pravatar.cc/150?img=11" },
// //       ]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStories();
// //   }, []);

// //   // Handle story upload
// //   const handleStoryUpload = async (file) => {
// //     if (!file) return;

// //     setUploading(true);

// //     const formData = new FormData();
// //     formData.append("media", file);
// //     formData.append("caption", "");
// //     formData.append("privacy", "followers");

// //     try {
// //       const res = await axios.post(
// //         "http://127.0.0.1:8000/api/accounts/story/create/",
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //           withCredentials: true,
// //         }
// //       );

// //       const saved = res.data.story;

// //       const newStory = {
// //         id: saved.id,
// //         user: saved.username || "You",
// //         avatar: saved.user_avatar || saved.media || URL.createObjectURL(file),
// //         isOwn: true,
// //         created_at: saved.created_at,
// //         caption: saved.caption,
// //       };

// //       setStories((prev) => [newStory, ...prev]);
// //     } catch (err) {
// //       console.error("Upload failed:", err.response?.data || err);
// //       alert("Story upload failed!");
// //     }

// //     setUploading(false);
// //   };

// //   return (
// //     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-3">Stories</h3>

// //       <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
// //         {/* Upload Story */}
// //         <div className="flex flex-col items-center flex-shrink-0 w-16 p-1 rounded-xl cursor-pointer">
// //           <div className="relative w-14 h-20 rounded-[32px] border-2 border-gray-400 overflow-hidden mb-1 flex items-center justify-center bg-gray-100">
// //             <input
// //               type="file"
// //               accept="image/*,video/*"
// //               onChange={(e) => handleStoryUpload(e.target.files[0])}
// //               className="absolute w-full h-full opacity-0 cursor-pointer"
// //             />
// //             <PlusIcon className={`w-5 h-5 text-black ${uploading ? "animate-pulse" : ""}`} />
// //           </div>
// //           <p className="text-xs truncate text-center text-gray-600">Your Story</p>
// //         </div>

// //         {/* Render Stories */}
// //         {stories.map((story) => (
// //           <div
// //             key={story.id}
// //             className="flex flex-col items-center flex-shrink-0 w-16 p-1 rounded-xl hover:bg-gray-50 transition duration-150 cursor-pointer"
// //           >
// //             <div className="relative w-14 h-20 rounded-[32px] border-2 border-yellow-400 overflow-hidden mb-1">
// //               <img
// //                 src={story.avatar}
// //                 alt={story.user}
// //                 className="object-cover w-full h-full rounded-[32px]"
// //               />
// //             </div>
// //             <p className="text-xs truncate w-full text-center text-gray-600">
// //               {story.user}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       <SuggestedUsers />
// //     </div>
// //   );
// // };

// // export default StorySection;


// // import React, { useEffect, useState } from "react";
// // import { PlusIcon } from "@heroicons/react/24/outline";
// // import axios from "axios";
// // import SuggestedUsers from "./SuggestedUsers";

// // const StorySection = () => {
// //   const [stories, setStories] = useState([]);
// //   const [uploading, setUploading] = useState(false);

// //   // Fetch stories from backend
// //   const fetchStories = async () => {
// //     try {
// //       const res = await axios.get("http://127.0.0.1:8000/api/accounts/story/", {
// //         withCredentials: true,
// //       });

// //       // Group stories by user
// //       const grouped = {};
// //       res.data.stories.forEach((story) => {
// //         const avatar = story.user_avatar || story.media || null;
// //         if (!grouped[story.username]) grouped[story.username] = [];
// //         grouped[story.username].push({ ...story, avatar });
// //       });

// //       const apiStories = Object.keys(grouped).map((username) => ({
// //         user: username,
// //         isOwn: username === "ravisingh1", // change if current user detection available
// //         stories: grouped[username],
// //         avatar: grouped[username][0].avatar, // first story thumbnail
// //       }));

// //       // Ensure "Your Story" slot exists
// //       const ownStoryIndex = apiStories.findIndex((s) => s.isOwn);
// //       if (ownStoryIndex === -1) {
// //         apiStories.unshift({
// //           user: "You",
// //           isOwn: true,
// //           stories: [],
// //           avatar: null,
// //         });
// //       }

// //       setStories(apiStories);
// //     } catch (err) {
// //       console.error("Failed to fetch stories:", err);
// //       // fallback
// //       setStories([
// //         { user: "You", isOwn: true, stories: [], avatar: null },
// //         { user: "Pratham", isOwn: false, stories: [{ avatar: "https://i.pravatar.cc/150?img=10" }] },
// //         { user: "Sid_x", isOwn: false, stories: [{ avatar: "https://i.pravatar.cc/150?img=11" }] },
// //       ]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStories();
// //   }, []);

// //   // Upload story
// //   const handleStoryUpload = async (file, userIndex) => {
// //     if (!file) return;
// //     setUploading(true);

// //     const formData = new FormData();
// //     formData.append("media", file);
// //     formData.append("caption", "");
// //     formData.append("privacy", "followers");

// //     const localPreview = URL.createObjectURL(file);

// //     // Optimistic update
// //     setStories((prev) => {
// //       const updated = [...prev];
// //       updated[userIndex].stories.push({ avatar: localPreview });
// //       updated[userIndex].avatar = localPreview;
// //       return updated;
// //     });

// //     try {
// //       const res = await axios.post(
// //         "http://127.0.0.1:8000/api/accounts/story/create/",
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //           withCredentials: true,
// //         }
// //       );

// //       const saved = res.data.story;
// //       const storyAvatar = saved.user_avatar || saved.media || localPreview;

// //       // Replace the last optimistic story with backend response
// //       setStories((prev) => {
// //         const updated = [...prev];
// //         const userStories = updated[userIndex].stories;
// //         userStories[userStories.length - 1] = { ...saved, avatar: storyAvatar };
// //         updated[userIndex].avatar = userStories[0].avatar; // update first thumbnail
// //         return updated;
// //       });
// //     } catch (err) {
// //       console.error("Upload failed:", err.response?.data || err);
// //       alert("Story upload failed!");
// //       // Remove last optimistic story
// //       setStories((prev) => {
// //         const updated = [...prev];
// //         updated[userIndex].stories.pop();
// //         updated[userIndex].avatar = updated[userIndex].stories[0]?.avatar || null;
// //         return updated;
// //       });
// //     }

// //     setUploading(false);
// //   };

// //   return (
// //     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-3">Stories</h3>

// //       <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
// //         {stories.map((userStory, idx) => (
// //           <div
// //             key={userStory.user}
// //             className="flex flex-col items-center flex-shrink-0 w-16 p-1 rounded-xl hover:bg-gray-50 transition duration-150 cursor-pointer"
// //           >
// //             <div className="relative w-14 h-20 rounded-[32px] border-2 overflow-hidden mb-1 flex items-center justify-center bg-gray-100">
// //               {userStory.isOwn ? (
// //                 <>
// //                   <input
// //                     type="file"
// //                     accept="image/*,video/*"
// //                     onChange={(e) => handleStoryUpload(e.target.files[0], idx)}
// //                     className="absolute w-full h-full opacity-0 cursor-pointer"
// //                   />
// //                   {userStory.avatar ? (
// //                     <img
// //                       src={userStory.avatar}
// //                       alt="Your Story"
// //                       className="object-cover w-full h-full rounded-[32px]"
// //                     />
// //                   ) : (
// //                     <PlusIcon className={`w-5 h-5 text-black ${uploading ? "animate-pulse" : ""}`} />
// //                   )}
// //                 </>
// //               ) : (
// //                 <img
// //                   src={userStory.avatar || "https://i.pravatar.cc/150?img=1"}
// //                   alt={userStory.user}
// //                   className="object-cover w-full h-full rounded-[32px]"
// //                 />
// //               )}
// //             </div>
// //             <p className="text-xs truncate w-full text-center text-gray-600">
// //               {userStory.isOwn ? "Your Story" : userStory.user}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       <SuggestedUsers />
// //     </div>
// //   );
// // };

// // export default StorySection;

// import React, { useEffect, useState } from "react";
// import { PlusIcon, XMarkIcon  } from "@heroicons/react/24/outline";
// import axios from "axios";
// import SuggestedUsers from "./SuggestedUsers";

// const StorySection = () => {
//   const [stories, setStories] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [currentStory, setCurrentStory] = useState(null);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
//   const [username, setUsername] = useState("");

//   // Fetch current logged-in user
//   const fetchCurrentUser = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/accounts/me/", { withCredentials: true });
//       setUsername(res.data.username);
//     } catch (err) {
//       console.error("Cannot fetch current user:", err);
//     }
//   };

//   // Fetch stories
//   const fetchStories = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/accounts/story/", { withCredentials: true });
//       const grouped = {};
//       res.data.stories.forEach((story) => {
//         if (!grouped[story.username]) grouped[story.username] = [];
//         grouped[story.username].push({
//           ...story,
//           avatar: story.user_avatar || story.media_files?.[0]?.file || null
//         });
//       });

//       const apiStories = Object.keys(grouped).map((user) => ({
//         user,
//         isOwn: user === username,
//         stories: grouped[user],
//         avatar: grouped[user][0].avatar,
//       }));

//       // Ensure "Your Story" exists
//       if (!apiStories.some(s => s.isOwn)) {
//         apiStories.unshift({ user: "You", isOwn: true, stories: [], avatar: null });
//       }

//       setStories(apiStories);
//     } catch (err) {
//       console.error("Failed to fetch stories:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser().then(fetchStories);
//   }, []);

//   // Handle story upload
//   const handleStoryUpload = async (files, userIndex) => {
//     if (!files) return;
//     setUploading(true);

//     const previews = Array.from(files).map(file => URL.createObjectURL(file));

//     // Optimistic update
//     setStories(prev => {
//       const updated = [...prev];
//       updated[userIndex].stories.push(...previews.map(avatar => ({ avatar })));
//       updated[userIndex].avatar = updated[userIndex].stories[0].avatar;
//       return updated;
//     });

//     try {
//       for (const file of files) {
//         const formData = new FormData();
//         formData.append("media", file);
//         formData.append("caption", "");
//         formData.append("privacy", "followers");

//         const res = await axios.post(
//           "http://127.0.0.1:8000/api/accounts/story/create/",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
//         );

//         const saved = res.data.story;
//         const storyAvatar = saved.user_avatar || saved.media || URL.createObjectURL(file);

//         setStories(prev => {
//           const updated = [...prev];
//           const userStories = updated[userIndex].stories;
//           // Replace last optimistic preview with backend response
//           const indexToReplace = userStories.findIndex(s => s.avatar === URL.createObjectURL(file));
//           if (indexToReplace !== -1) userStories[indexToReplace] = { ...saved, avatar: storyAvatar };
//           updated[userIndex].avatar = userStories[0].avatar;
//           return updated;
//         });
//       }
//     } catch (err) {
//       console.error("Upload failed:", err.response?.data || err);
//       alert("Story upload failed!");
//     }

//     setUploading(false);
//   };

//   return (
//     <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-3">Stories</h3>

//       <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
//         {stories.map((userStory, idx) => (
//           <div
//             key={userStory.user}
//             className="flex flex-col items-center flex-shrink-0 w-16 p-1 rounded-xl hover:bg-gray-50 transition duration-150 cursor-pointer"
//           >
//             <div
//               className="relative w-14 h-20 rounded-[32px] border-2 overflow-hidden mb-1 flex items-center justify-center bg-gray-100"
//               onClick={() => !userStory.isOwn && setCurrentStory(userStory)}
//             >
//               {userStory.isOwn ? (
//                 <>
//                   <input
//                     type="file"
//                     accept="image/*,video/*"
//                     multiple
//                     onChange={(e) => handleStoryUpload(e.target.files, idx)}
//                     className="absolute w-full h-full opacity-0 cursor-pointer"
//                   />
//                   {userStory.avatar ? (
//                     <img src={userStory.avatar} alt="Your Story" className="object-cover w-full h-full rounded-[32px]" />
//                   ) : (
//                     <PlusIcon className={`w-5 h-5 text-black ${uploading ? "animate-pulse" : ""}`} />
//                   )}
//                 </>
//               ) : (
//                 <img src={userStory.avatar || "https://i.pravatar.cc/150?img=1"} alt={userStory.user} className="object-cover w-full h-full rounded-[32px]" />
//               )}
//             </div>
//             <p className="text-xs truncate w-full text-center text-gray-600">
//               {userStory.isOwn ? "Your Story" : userStory.user}
//             </p>
//           </div>
//         ))}
//       </div>

//       <SuggestedUsers />

//       {/* Fullscreen Story Modal */}
//       {currentStory && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
//           <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setCurrentStory(null)}>
//             <XMarkIcon  className="w-6 h-6" />
//           </button>

//           <div className="max-w-lg w-full">
//             <img
//               src={currentStory.stories[currentMediaIndex].avatar}
//               alt="Story"
//               className="object-contain w-full max-h-[80vh] mx-auto"
//             />
//             <p className="text-white mt-2">{currentStory.caption}</p>

//             {currentStory.stories.length > 1 && (
//               <div className="flex justify-between mt-4 text-white text-2xl">
//                 <button onClick={() => setCurrentMediaIndex(Math.max(currentMediaIndex - 1, 0))}>‹</button>
//                 <button onClick={() => setCurrentMediaIndex(Math.min(currentMediaIndex + 1, currentStory.stories.length - 1))}>›</button>
//               </div>
//             )}

//             {/* Emoji / Message */}
//             <div className="mt-4 flex space-x-2">
//               <input type="text" placeholder="Send a message..." className="flex-1 p-2 rounded" />
//               <button>😊</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StorySection;


// src/components/StorySection.jsx
import React, { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import SuggestedUsers from "./SuggestedUsers";
import Picker from "emoji-picker-react";

const StorySection = ({ setShowNotifications, setShowChat }) => {
  const [stories, setStories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [reply, setReply] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  // Fetch user
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/accounts/me/", {
        withCredentials: true,
      });
      setUsername(res.data.username);
    } catch (err) {
      console.error("Cannot fetch current user:", err);
    }
  };

  // Fetch stories
  const fetchStories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/accounts/story/", {
        withCredentials: true,
      });

      const grouped = {};
      res.data.stories.forEach((story) => {
        if (!grouped[story.username]) grouped[story.username] = [];
        grouped[story.username].push({
          ...story,
          avatar: story.user_avatar || story.media || null,
        });
      });

      const apiStories = Object.keys(grouped).map((user) => ({
        user,
        isOwn: user === username,
        stories: grouped[user],
        avatar: grouped[user][0].avatar,
      }));

      if (!apiStories.some((s) => s.isOwn)) {
        apiStories.unshift({ user: "You", isOwn: true, stories: [], avatar: null });
      }

      setStories(apiStories);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser().then(fetchStories);
  }, []);

  // Upload Story
  const handleStoryUpload = async (files, userIndex) => {
    if (!files) return;
    setUploading(true);

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));

    setStories((prev) => {
      const updated = [...prev];
      updated[userIndex].stories.push(
        ...previews.map((avatar) => ({ avatar }))
      );
      updated[userIndex].avatar = updated[userIndex].stories[0].avatar;
      return updated;
    });

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("media", file);
        formData.append("caption", "");
        formData.append("privacy", "followers");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/accounts/story/create/",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        const saved = res.data.story;
        const storyAvatar = saved.media || URL.createObjectURL(file);

        setStories((prev) => {
          const updated = [...prev];
          const userStories = updated[userIndex].stories;
          const indexToReplace = userStories.findIndex(
            (s) => s.avatar === URL.createObjectURL(file)
          );
          if (indexToReplace !== -1)
            userStories[indexToReplace] = { ...saved, avatar: storyAvatar };
          updated[userIndex].avatar = userStories[0].avatar;
          return updated;
        });
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err);
      alert("Story upload failed!");
    }

    setUploading(false);
  };

  // Send Reply
  const sendReply = async () => {
    if (!reply.trim()) return;
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/story/reply/",
        {
          story_id: currentStory.stories[currentMediaIndex].id,
          message: reply,
        },
        { withCredentials: true }
      );
      setReply("");
      setShowEmoji(false);
      alert("Reply sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">

      {/* -------------------------------------- */}
      {/* 🔥 TOP HEADER — WITH CHAT + NOTIFICATION */}
      {/* -------------------------------------- */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Stories</h3>

        <div className="flex space-x-3">

          {/* CHAT BTN */}
          <button
            onClick={() => setShowChat(true)}
            className="relative flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-110 transition-all"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.07687 16.0806C4.09614 15.8793 4.07076 15.6762 4.00254 15.4859C3.93433 15.2955 3.82497 15.1225 3.68225 14.9793C2.22475 13.5163 1.375 11.6435 1.375 9.625C1.375 5.236 5.5055 1.375 11 1.375C16.4945 1.375 20.625 5.236 20.625 9.625C20.625 14.014 16.4945 17.875 11 17.875C10.0307 17.8774 9.06534 17.7516 8.129 17.501C7.80172 17.4133 7.45358 17.4495 7.15138 17.6028C6.61925 17.8723 5.44637 18.3865 3.52962 18.8306C3.7968 17.9329 3.98 17.0123 4.07687 16.0806ZM2.97687 20.3541L3.00437 20.3486C5.52063 19.8495 7.05787 19.1909 7.77287 18.8293C8.82537 19.111 9.91046 19.2524 11 19.25C17.0748 19.25 22 14.9408 22 9.625C22 4.30925 17.0748 0 11 0C4.92525 0 0 4.30925 0 9.625C0 12.045 1.02163 14.2588 2.70875 15.95C2.59116 17.0365 2.34941 18.1059 1.98825 19.1373L1.98412 19.1524C1.88137 19.4477 1.76949 19.7398 1.64863 20.0283C1.54 20.284 1.75038 20.57 2.024 20.526C2.34252 20.4738 2.66019 20.4165 2.97687 20.3541ZM11 6.86538C13.288 4.51275 19.0094 8.6295 11 13.9219C2.99063 8.62813 8.712 4.51275 11 6.86538Z"
                  fill="#73725E"
                />
              </svg>
              <HeartIcon className="absolute w-3 h-3 text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </button>

          {/* NOTIFICATION BTN */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative flex items-center justify-center p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-100 hover:scale-110 transition-all"
          >
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                d="M15.5833 4.58333V10.0833C17.1417 10.0833 18.3333 8.89167 18.3333 7.33333C18.3333 5.775 17.1417 4.58333 15.5833 4.58333ZM8.25 3.66667H1.83333C0.825 3.66667 0 4.49167 0 5.5V9.16667C0 10.175 0.825 11 1.83333 11H2.75V13.75C2.75 14.7583 3.575 15.5833 4.58333 15.5833H6.41667V11H8.25L11.9167 14.6667H13.75V0H11.9167L8.25 3.66667Z"
                fill="#73725E"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Story List */}
      <div className="flex overflow-x-auto space-x-4 pb-2 no-scrollbar">
        {stories.map((userStory, idx) => (
          <div
            key={userStory.user}
            className="flex flex-col items-center flex-shrink-0 w-16 p-1 rounded-xl hover:bg-gray-50 transition duration-150 cursor-pointer"
          >
            <div
              className="relative w-14 h-20 rounded-[32px] border-2 overflow-hidden mb-1 flex items-center justify-center bg-gray-100"
              onClick={() => !userStory.isOwn && setCurrentStory(userStory)}
            >
              {userStory.isOwn ? (
                <>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => handleStoryUpload(e.target.files, idx)}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                  />
                  {userStory.avatar ? (
                    <img
                      src={userStory.avatar}
                      alt="Your Story"
                      className="object-cover w-full h-full rounded-[32px]"
                    />
                  ) : (
                    <PlusIcon
                      className={`w-5 h-5 text-black ${
                        uploading ? "animate-pulse" : ""
                      }`}
                    />
                  )}
                </>
              ) : (
                <img
                  src={userStory.avatar || "https://i.pravatar.cc/150?img=1"}
                  alt={userStory.user}
                  className="object-cover w-full h-full rounded-[32px]"
                />
              )}
            </div>
            <p className="text-xs truncate w-full text-center text-gray-600">
              {userStory.isOwn ? "Your Story" : userStory.user}
            </p>
          </div>
        ))}
      </div>

      <SuggestedUsers />

      {/* Story Viewer */}
      {currentStory && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">

          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => {
              setCurrentStory(null);
              setCurrentMediaIndex(0);
              setReply("");
            }}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="max-w-lg w-full flex flex-col items-center">

            <img
              src={currentStory.stories[currentMediaIndex].media}
              alt="Story"
              className="object-contain w-full max-h-[70vh] mx-auto rounded shadow-lg"
            />

            {currentStory.stories[currentMediaIndex].caption && (
              <p className="text-white mt-2 text-center">
                {currentStory.stories[currentMediaIndex].caption}
              </p>
            )}

            {currentStory.stories.length > 1 && (
              <div className="flex justify-between mt-4 text-white text-3xl w-full px-4">
                <button
                  onClick={() =>
                    setCurrentMediaIndex(Math.max(currentMediaIndex - 1, 0))
                  }
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setCurrentMediaIndex(
                      Math.min(
                        currentMediaIndex + 1,
                        currentStory.stories.length - 1
                      )
                    )
                  }
                >
                  ›
                </button>
              </div>
            )}

            {/* Reply Section */}
            <div className="mt-5 flex space-x-2 w-full max-w-md items-center relative">

              {showEmoji && (
                <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-xl p-2 max-h-[250px] overflow-y-scroll">
                  <Picker
                    onEmojiClick={(e) => setReply((prev) => prev + e.emoji)}
                    height={300}
                    width={350}
                  />
                </div>
              )}

              <button
                onClick={() => setShowEmoji((prev) => !prev)}
                className="bg-white rounded-full px-3 py-1 text-sm"
              >
                😊
              </button>

              <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 p-2 rounded"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <button
                onClick={sendReply}
                className="bg-white rounded-full px-3 py-1 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorySection;
