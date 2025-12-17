import React from "react";

const storiesData = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: `Leo Park ${i + 1}`,
  profilePic: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

const StoryShareList = ({ selectedUsers, setSelectedUsers }) => {
  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-3 px-4">
      <div className="grid grid-cols-6 gap-4 h-[320px] overflow-y-auto scrollbar-hide">
        {storiesData.map((u) => {
          const isSelected = selectedUsers.includes(u.id);
          return (
            <div
              key={u.id}
              onClick={() => toggleSelect(u.id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[60px] h-[60px] rounded-full border-4 ${
                  isSelected ? "border-blue-500" : "border-gray-300"
                }`}
              >
                <img src={u.profilePic} className="rounded-full" />
              </div>
              <span className="text-xs mt-1">
                {u.name.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryShareList;
