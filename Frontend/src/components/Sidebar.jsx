// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
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
  { label: "Home", icon: Home, path: "/home-pages/feed" },
  { label: "Ecommerce", icon: ShoppingBag, path: "/home-pages/ecommerce" },
  { label: "Deals", icon: Gift, path: "/home-pages/deals" },
  { label: "Create", icon: PlusSquare, path: "/home-pages/create" },
  { label: "Explore", icon: Compass, path: "/home-pages/explore" },
  { label: "Dashboard", icon: BarChart2, path: "/home-pages/dashboard" },
  { label: "Profile", icon: User, path: "/home-pages/profile" },
];

const Sidebar = () => {
  return (
    <div
      className="h-full flex flex-col text-left"
      style={{
        width: "353px",
        background: "white",
        borderRight: "0.5px solid #73725E",
      }}
    >
      {/* LOGO */}
      <div className="px-8 pt-8 pb-10">
        <span className="font-poppins font-semibold text-[32px] text-[#5E5B29]">
          Univa
        </span>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-6">
        <ul className="space-y-3">
          {menu.map(({ label, icon: Icon, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  h-[48px] px-5
                  rounded-xl
                  w-full
                  text-[15px]
                  transition
                  ${
                    isActive
                      ? "bg-white shadow-sm text-[#1F1F1F] font-medium"
                      : "text-[#7A7A7A] hover:bg-[#F2F2EC]"
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={
                        isActive ? "text-[#1F1F1F]" : "text-[#9A9A9A]"
                      }
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
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
