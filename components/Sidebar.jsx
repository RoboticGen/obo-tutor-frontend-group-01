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
    setIsLogged(false);

    router.push("/");
  };

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* new chat  */}

        <NewChat />

        <div>{/* model selection */}</div>
        {chats.map((chat) => {
          return <ChatRow key={chat.id} chatId={chat.id} />;
        })}
      </div>

      <button
        onClick={logoutHandler}
        className="text-white border-white border"
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
