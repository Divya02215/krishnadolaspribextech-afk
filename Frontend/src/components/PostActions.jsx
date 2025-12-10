// src/components/PostActions.jsx
import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'; 

const PostActions = () => {
  return (
    <div className="p-4 pt-0"> {/* p-4 से हटाकर pt-0 ताकि FeedItem में पैडिंग न दोहराई जाए */}
      <div className="flex justify-between items-center mb-2">
        {/* Left Icons: Heart (Like), MessageCircle (Comment), Send (Share) */}
        <div className="flex space-x-3 text-gray-600"> 
          <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer transition duration-150" title="Like" />
          <MessageCircle className="w-6 h-6 hover:text-blue-500 cursor-pointer transition duration-150" title="Comment" />
          <Send className="w-6 h-6 hover:text-green-500 cursor-pointer transition duration-150" title="Share" />
        </div>
        
        {/* Right Icon: Bookmark (Save) */}
        <Bookmark className="w-6 h-6 text-gray-600 hover:text-yellow-600 cursor-pointer transition duration-150" title="Save" />
      </div>
    </div>
  );
};

export default PostActions;