"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function ChatLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white shadow-lg rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-20 lg:z-0 
        w-80 lg:w-80 h-full
        bg-white border-r border-blue-200 shadow-xl lg:shadow-none
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {children}
      </div>
    </div>
  );
}

export default ChatLayout;
// import React, { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// function ChatLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Mobile Toggle Button */}

//       {isSidebarOpen ? (
//         <XMarkIcon
//           className="hidden p-2 bg-gray-600 text-white fixed top-4 left-4 z-20"
//           onClick={toggleSidebar}
//         />
//       ) : (
//         <Bars3Icon
//           className="md:hidden p-2 bg-gray-600 text-white w-10 h-10 fixed top-4 left-4 z-20"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed md:flex z-10 md:z-0 bg-[#202123] h-screen overflow-y-auto transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         <Sidebar toggleSidebar={toggleSidebar} />
//       </div>

//       {/* Content */}
//       <div className="bg-[#343541] flex-1">{children}</div>
//     </div>
//   );
// }

// export default ChatLayout;
