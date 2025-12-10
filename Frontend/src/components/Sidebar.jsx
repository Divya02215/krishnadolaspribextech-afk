// src/components/Sidebar.jsx (एडजस्टमेंट के साथ)
import React from 'react';
import { Home, ShoppingBag, Gift, PlusSquare, Compass, BarChart2, User, MoreHorizontal } from 'lucide-react';

const Sidebar = () => {
  return (
   <div
  className="fixed top-0 left-0 h-full w-64 bg-white z-30 flex flex-col"
  style={{
    width: "353px",
    height: "802px",
    left: "100px",
    background: "rgba(255, 255, 255, 1)",
    borderStyle: "solid",
    borderColor: "rgba(115, 114, 94, 1)",
    borderWidth: "0px 0.5px 0px 0.5px",
  }}
>

  <div className="flex items-center h-16 p-4" 
       style={{ borderBottom: "0.5px solid rgba(115, 114, 94, 1)" }}>
    <span className="text-2xl font-bold text-blue-600">Univa</span>
  </div>

  <nav className="flex-1 p-4">
    <ul>
      <li className="mb-4">
        <a href="#" className="flex items-center text-blue-600 font-semibold p-2 rounded-lg bg-blue-50">
          <Home className="w-5 h-5 mr-3" />
          Home
        </a>
      </li>
      
      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <ShoppingBag className="w-5 h-5 mr-3" />
          Ecommerce
        </a>
      </li>

      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <Gift className="w-5 h-5 mr-3" />
          Deals
        </a>
      </li>

      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <PlusSquare className="w-5 h-5 mr-3" />
          Create
        </a>
      </li>

      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <Compass className="w-5 h-5 mr-3" />
          Explore
        </a>
      </li>

      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <BarChart2 className="w-5 h-5 mr-3" />
          Dashboard
        </a>
      </li>

      <li className="mb-4">
        <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
          <User className="w-5 h-5 mr-3" />
          Profile
        </a>
      </li>
    </ul>
  </nav>

  <div className="mt-auto p-4" 
       style={{ borderTop: "0.5px solid rgba(115, 114, 94, 1)" }}>
    <a href="#" className="flex items-center text-gray-700 p-2 rounded-lg hover:bg-gray-100">
      <MoreHorizontal className="w-5 h-5 mr-3" />
      More
    </a>
  </div>

</div>

 );
};

export default Sidebar;