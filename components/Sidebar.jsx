"use client";
import React from "react";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { UserCircleIcon, ArrowRightOnRectangleIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Obo Tutor</h1>
            <p className="text-xs text-blue-600">AI Learning Assistant</p>
          </div>
        </div>
        <NewChat />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm">
              <p>No conversations yet</p>
              <p className="text-xs mt-1">Start a new chat to begin!</p>
            </div>
          </div>
        ) : (
          chats.map((chat) => (
            <ChatRow key={chat.id} chatId={chat.id} />
          ))
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-blue-100 space-y-2">
        <button
          onClick={profileHandler}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
        >
          <UserCircleIcon className="w-5 h-5 group-hover:text-blue-600" />
          <span className="text-sm font-medium">Profile</span>
        </button>

        <button
          onClick={logoutHandler}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:text-red-600" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
