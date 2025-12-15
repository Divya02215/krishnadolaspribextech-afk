// src/components/Sidebar.jsx
import React from "react";
import {
  Home,
  ShoppingBag,
  Gift,
  PlusSquare,
  Compass,
  BarChart2,
  User,
  MoreHorizontal,
} from "lucide-react";

const menu = [
  { label: "Home", icon: Home, active: true },
  { label: "Ecommerce", icon: ShoppingBag },
  { label: "Deals", icon: Gift },
  { label: "Create", icon: PlusSquare },
  { label: "Explore", icon: Compass },
  { label: "Dashboard", icon: BarChart2 },
  { label: "Profile", icon: User },
];

const Sidebar = () => {
  return (
    <div
  className="h-full flex flex-col text-left"
  style={{
    width: "353px",
    background: "white",
    // borderLeft: "0.5px solid #73725E",
    borderRight: "0.5px solid #73725E",
  }}
>

      {/* LOGO */}
      {/* LOGO */}
<div className="px-8 pt-8 pb-10">
  <span className="font-poppins font-semibold text-[32px] text-[#5E5B29]">
    Univa
  </span>
</div>


      {/* MENU */}
      <nav className="flex-1 px-6">
        <ul className="space-y-3">
          {menu.map(({ label, icon: Icon, active }) => (
            <li key={label}>
              <button
                className={`
                  flex items-center gap-4
                  h-[48px] px-5
                  rounded-xl
                  w-full
                  text-[15px]
                  transition
                  ${
                    active
                      ? "bg-white shadow-sm text-[#1F1F1F] font-medium"
                      : "text-[#7A7A7A] hover:bg-[#F2F2EC]"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={active ? "text-[#1F1F1F]" : "text-[#9A9A9A]"}
                />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* MORE */}
      <div className="px-6 pb-6 mt-auto">
        <button
          className="
            flex items-center gap-4
            h-[48px] px-5
            rounded-xl
            w-full
            text-[15px]
            text-[#7A7A7A]
            hover:bg-[#F2F2EC]
          "
        >
          <MoreHorizontal size={20} className="text-[#9A9A9A]" />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
