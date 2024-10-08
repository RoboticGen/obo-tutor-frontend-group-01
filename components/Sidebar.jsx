"use client";
import React from "react";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();
  const { chats, setChats, isLogged, setIsLogged } = useGlobalContext();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setChats([]);
    setIsLogged(false);

    router.push("/");
  };

  const profileHandler = () => {
    router.push("/profile");
  };

  return (
    <div className="p-3 flex flex-col h-screen ">
      <div>
      <NewChat />
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* new chat  */}

       
        {/* model selection */}

        {chats.map((chat) => {
          return <ChatRow key={chat.id} chatId={chat.id} />;
        })}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={profileHandler}
          className="text-white border-white border"
        >
          Profile
        </button>

        <button
          onClick={logoutHandler}
          className="text-white border-white border"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
