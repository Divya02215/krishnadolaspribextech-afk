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
    <div className="h-full flex flex-col">
      {/* LOGO */}
      <div className="pt-8 pb-10 pl-10">
        <span className="font-poppins font-semibold text-[32px] text-[#5E5B29]">
          Univa
        </span>
      </div>

      {/* MENU */}
      <nav className="flex-1 pl-8 pr-6">
        <ul className="space-y-3">
          {menu.map(({ label, icon: Icon, path }) => (
            <li key={label}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  h-12 px-5
                  rounded-xl
                  text-[15px]
                  transition
                  ${
                    isActive
                      ? "bg-[#F2F2EC] text-black font-medium"
                      : "text-gray-500 hover:bg-[#F2F2EC]"
                  }
                `
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* MORE */}
      <div className="pl-8 pr-6 pb-8">
        <button
          className="
            flex items-center gap-4
            h-12 px-5
            w-full
            rounded-xl
            text-[15px]
            text-gray-500
            hover:bg-[#F2F2EC]
            transition
          "
        >
          <MoreHorizontal size={18} />
          More
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
