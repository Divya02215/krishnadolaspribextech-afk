import React, { useState, useCallback } from 'react';
import { 
  Link, // Not used, custom SVG used instead
  MoreHorizontal, 
  Search, 
  UserPlus, // Not used, custom SVG used instead
  MessageSquareText, // Not used, custom SVG used instead
  Download, 
} from 'lucide-react';
import StoryShareList from './StoryShareList'; 

// Helper function for old browsers (for modern, navigator.clipboard.writeText is preferred)
const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // Modern approach
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else if (document.execCommand) {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  }
  return false;
};

// Custom SVG Icons and Bottom Sharing Options
const bottomSharingOptions = (setShareMessage, onClose) => [
  // 1. Add to Story (Custom SVG)
  {
    name: 'Add to Story',
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* OUTER DASHED CIRCLE */}
        <circle
          cx="15"
          cy="15"
          r="13"
          stroke="#73725E"
          strokeWidth="2"
          strokeDasharray="5 4"
          fill="none"
        />

        {/* TRIANGLE INSIDE */}
        <polygon
          points="15,7 23,21 7,21"     // center aligned
          fill="none"
          stroke="#73725E"
          strokeWidth="2"
        />
      </svg>
    ),
    action: () => console.log('Adding to story...'),
  },

  // 2. Copy Link (Custom SVG)
  {
    name: 'Copy Link',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {/* The two overlapping rectangles mimicking a link icon or documents */}
        <rect x="6" y="6" width="12" height="14" rx="2" ry="2"  stroke="#73725E" strokeWidth="1.5" fill="none" />
        <rect x="9" y="2" width="12" height="14" rx="2" ry="2"  stroke="#73725E" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    action: async (setShareMessage, onClose) => {
      const dummyLink = "https://your.app/share/postid";
      const isCopied = await copyToClipboard(dummyLink);
      if (isCopied) {
        setShareMessage("Link copied to clipboard!");
      } else {
        setShareMessage("Failed to copy link.");
      }
      setTimeout(() => {
        setShareMessage(null);
        onClose();
      }, 1500);
    },
  },

  // 3. Download (Custom SVG with div wrapper for border)
  {
    name: 'Download',
    icon: (
      <div className="w-[19px] h-[19px] border-[1.56px] border-[#73725E] rounded-[4px] flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* BOTTOM BOX */}
          <rect
            x="4"
            y="15"
            width="16"
            height="5"
            rx="2"
            ry="2"
            stroke="#73725E"
            strokeWidth="1.56"
            fill="none"
          />

          {/* DOWN ARROW */}
          <path
            d="M12 5v8"
            stroke="#73725E"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M9 10l3 3 3-3"
            stroke="#73725E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    action: (setShareMessage, onClose) => {
      setShareMessage("Download initiated...");
      setTimeout(() => {
        setShareMessage(null);
        onClose();
      }, 1500);
    },
  },

  // 4. DM (Custom SVG)
  {
    name: 'DM',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* DM BOX (Chat bubble with tail) */}
        <path
          d="M4 4h16v12H7l-3 3V4z"
          stroke="#73725E"
          strokeWidth="1.5"
          fill="none"
        />

        {/* THREE DOTS (CENTERED) */}
        {/* Using a solid color defined in the original code for the dots */}
        <circle cx="10" cy="11" r="1" fill="rgba(115, 114, 94, 1)" />
        <circle cx="12" cy="11" r="1" fill="rgba(115, 114, 94, 1)" />
        <circle cx="14" cy="11" r="1" fill="rgba(115, 114, 94, 1)" />
      </svg>
    ),
    action: () => console.log('Opening DM...'),
  },

{
  name: 'WhatsApp',
  icon: (
    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 14.5c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15s-.8 1-.95 1.2-.35.3-.65.1c-.3-.15-1.25-.45-2.35-1.45-.85-.75-1.425-1.65-1.6-1.95s-.02-.45.12-.6c.125-.15.3-.35.45-.525s.2-.25.3-.425c.1-.175.05-.3-.025-.525-.075-.225-.7-1.7-.95-2.35-.25-.65-.5-.55-.7-.55s-.35-.025-.55-.025c-.2 0-.525.075-.8.35s-1 1-1 2.45 1.025 2.85 1.175 3.05 2.025 3.05 4.9 4.25c2.875 1.2 2.875.8 3.4.75s1.65-.75 1.875-1.475c.225-.725.225-1.35.15-1.475s-.3-.225-.55-.375z"
        />
      </svg>
    </div>
  ),
  action: () => {
    const link = "https://your.app/share/postid"; 
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, "_blank");
    console.log("Sharing to WhatsApp...");
  },
}
,




  // 5. More (Lucide Icon)
  { 
    name: 'More', 
    icon: <MoreHorizontal className="w-6 h-6 text-[#73725E]" />, // Added color for consistency
    action: () => console.log('Showing more options...'), 
  },
];
<svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1958_1177)">
            <path
              d="M0.514995 11.8563C0.514433 13.8728 1.0453 15.8417 2.05473 17.5771L0.418457 23.5066L6.5324 21.9156C8.22345 22.8292 10.1181 23.308 12.0435 23.3081H12.0486C18.4046 23.3081 23.5786 18.1748 23.5813 11.8653C23.5825 8.80792 22.3839 5.93295 20.2063 3.76997C18.029 1.60718 15.1334 0.415458 12.0481 0.414062C5.69131 0.414062 0.517713 5.54709 0.515089 11.8563"
              fill="url(#paint0_linear_1958_1177)"
            />
            <path
              d="M0.103217 11.8527C0.102561 13.9417 0.652452 15.981 1.69787 17.7786L0.00292969 23.9207L6.3361 22.2726C8.0811 23.2168 10.0458 23.7147 12.045 23.7154H12.0501C18.6342 23.7154 23.994 18.3975 23.9968 11.8621C23.998 8.69488 22.7563 5.71656 20.5009 3.47609C18.2451 1.23591 15.2459 0.00130233 12.0501 0C5.46492 0 0.105841 5.31721 0.103217 11.8527ZM3.87485 17.469L3.63838 17.0965C2.64432 15.5277 2.11964 13.7149 2.12039 11.8534C2.12245 6.4213 6.5767 2.00186 12.0539 2.00186C14.7063 2.00298 17.1991 3.02921 19.074 4.89116C20.9488 6.7533 21.9804 9.22865 21.9798 11.8614C21.9773 17.2935 17.523 21.7135 12.0501 21.7135H12.0462C10.2642 21.7126 8.51646 21.2376 6.99228 20.34L6.62956 20.1265L2.87133 21.1045L3.87485 17.469Z"
              fill="url(#paint1_linear_1958_1177)"
            />
            <path
              d="M9.06451 6.89771C8.84088 6.4044 8.60553 6.39445 8.39287 6.3858C8.21872 6.37836 8.01965 6.37892 7.82076 6.37892C7.62169 6.37892 7.29824 6.45324 7.02484 6.74952C6.75116 7.04608 5.97998 7.76273 5.97998 9.22031C5.97998 10.6779 7.04968 12.0866 7.1988 12.2845C7.3481 12.482 9.26386 15.5689 12.298 16.7564C14.8196 17.7433 15.3327 17.547 15.88 17.4975C16.4274 17.4482 17.6462 16.7811 17.8948 16.0892C18.1437 15.3975 18.1437 14.8046 18.0691 14.6807C17.9945 14.5572 17.7954 14.4831 17.4969 14.335C17.1983 14.1869 15.7307 13.4701 15.4571 13.3712C15.1834 13.2724 14.9844 13.2231 14.7854 13.5198C14.5863 13.8159 14.0147 14.4831 13.8404 14.6807C13.6664 14.8787 13.4921 14.9034 13.1937 14.7552C12.895 14.6065 11.9337 14.2941 10.7931 13.2849C9.9057 12.4996 9.3066 11.5298 9.13246 11.2331C8.95832 10.937 9.11381 10.7764 9.26349 10.6288C9.39761 10.496 9.5621 10.2828 9.7115 10.1099C9.86034 9.93687 9.91001 9.81343 10.0096 9.61585C10.1092 9.41808 10.0593 9.24506 9.98481 9.09687C9.91001 8.94868 9.32994 7.48347 9.06451 6.89771Z"
              fill="white"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1958_1177"
              x1="1158.56"
              y1="2309.67"
              x2="1158.56"
              y2="0.414062"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1FAF38" />
              <stop offset="1" stopColor="#60D669" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1958_1177"
              x1="1199.7"
              y1="2392.07"
              x2="1199.7"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F9F9F9" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <clipPath id="clip0_1958_1177">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>

const ShareModal = ({ isOpen, onClose, postId = 'default-post-123' }) => {
  const [searchInput, setSearchInput] = useState('');
  const [shareMessage, setShareMessage] = useState(null); 

  const handleDirectShare = useCallback((userNames) => {
    const namesString = Array.isArray(userNames) ? userNames.join(', ') : userNames;
    setShareMessage(`Shared Post ID ${postId} successfully to: ${namesString}`);
    setTimeout(() => {
      setShareMessage(null);
      onClose();
    }, 3000);
  }, [postId, onClose]);

  // Unified action handler to correctly pass setShareMessage and onClose to actions that need them
  const handleOptionClick = useCallback((action) => {
    // Check if the action expects arguments (setShareMessage, onClose)
    if (action.length === 2) {
      action(setShareMessage, onClose);
    } else {
      action();
     
    }
  }, [onClose]);

  const options = bottomSharingOptions(setShareMessage, onClose);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50" 
      onClick={onClose}
    >
      <div
   
        className="relative bg-white rounded-t-3xl w-full  max-w-2xl p-4 pb-8 shadow-2xl transform 
        transition-transform duration-300 ease-out max-h-[293px] md:max-h-[50vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          
        }}
      >

       
       
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {shareMessage && (
          <div className="p-3 mb-4 text-sm font-medium text-center text-green-800 bg-green-100 rounded-lg animate-pulse">
            {shareMessage}
          </div>
        )}

        <h2 className="text-xl font-bold mb-4 text-gray-800">Share Post</h2>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#73725E]" />
          
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Anything"
            className="
              w-[303px] h-[42px] 
              pl-10 pr-4
              bg-[#FFFFFF] 
              rounded-xl
              border border-[#E8ECE9] 
              shadow-[0px_2.34px_5.26px_0px_#00000024] 
              placeholder-[#73725E]
              text-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-[#73725E]
            "
          />
        </div>

        <StoryShareList onShare={handleDirectShare} />

        <div className="border-t border-gray-200 my-4"></div>
        <h3 className="text-md font-semibold mb-3 text-gray-700">Other Sharing Options</h3>

        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {options.map((option) => (
            <button
              key={option.name}
              onClick={() => handleOptionClick(option.action)}
              className="flex flex-col items-center p-1 flex-shrink-0 text-xs text-gray-700 
              hover:text-[#73725E] transition-colors focus:outline-none"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gray-100 
              rounded-full mb-1 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                {option.icon}
              </div>
              <span className="text-xs font-medium text-center">{option.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;