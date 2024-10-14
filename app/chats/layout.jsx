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
    <div className="flex">
      {/* Sidebar  */}

      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto lg:min-w-[20rem]">
        <div>
          {isSidebarOpen ? (
            <XMarkIcon
              className="lg:hidden p-2 bg-gray-600 text-white w-10 h-10 fixed top-4 left-4 z-20"
              onClick={toggleSidebar}
            />
          ) : (
            <Bars3Icon
              className="lg:hidden p-2 bg-gray-600 text-white w-10 h-10 fixed top-4 left-4 z-20"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div
          className={`fixed bg-[#202123] lg:static  overflow-y-auto  lg:pt-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <Sidebar />
        </div>
      </div>

      {/* notification  */}
      {/* <ClientProvider /> */}

      <div className="bg-[#343541] w-full h-screen lg:flex-1">{children}</div>
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
