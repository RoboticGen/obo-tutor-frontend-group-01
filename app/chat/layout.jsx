import React from "react";
import Sidebar from "@/components/Sidebar";

function ChatLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar  */}
      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
        <Sidebar />
      </div>

      {/* notification  */}
      {/* <ClientProvider /> */}

      <div className="bg-[#343541] flex-1 ">{children}</div>
    </div>
  );
}

export default ChatLayout;
