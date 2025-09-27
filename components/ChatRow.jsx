"use client";

import React, { useState } from "react";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function ChatRow({ chatId }) {
  const pathname = usePathname();
  const router = useRouter();

  const { chats, setChats, userId } = useGlobalContext();

  const [active, setActive] = useState(false);
  const [chatboxName, setChatboxName] = useState("");

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(chatId));
  }, [pathname]);

  useEffect(() => {
    setChatboxName(chats.find((chat) => chat.id == chatId)?.chat_name);
  }, [chats]);

  const deleteChat = async () => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/chatbox/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setChats(chats.filter((chat) => chat.id !== chatId));
      toast.success("Chat deleted successfully");
      router.push("/chats");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Please login to continue");
        //remove token
        localStorage.removeItem("token");

        router.push("/");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className={`group relative rounded-lg transition-all duration-200 ${
      active 
        ? "bg-blue-100 border border-blue-200" 
        : "hover:bg-gray-50 border border-transparent"
    }`}>
      <Link 
        href={`/chats/${chatId}`} 
        className="flex items-center space-x-3 px-3 py-2 w-full"
      >
        <ChatBubbleLeftIcon className={`w-4 h-4 ${
          active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
        }`} />
        <p className={`flex-1 text-sm font-medium truncate ${
          active ? "text-blue-900" : "text-gray-700"
        }`}>
          {chatboxName === "" ? "New Chat" : chatboxName}
        </p>
      </Link>
      
      {active && (
        <button
          onClick={deleteChat}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md hover:bg-red-100 transition-colors group/delete"
        >
          <TrashIcon className="w-4 h-4 text-red-400 group-hover/delete:text-red-600" />
        </button>
      )}
    </div>
  );
}

export default ChatRow;
