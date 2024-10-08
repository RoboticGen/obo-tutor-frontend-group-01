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
    const fetchChat = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/chatbox/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setChatboxName(response.data.chat_name);
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

    fetchChat(); // Call the async function
  }, [chatId]);

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
    <div
      className={`flex rounded-lg px-2 justify-center ${
        active && "bg-gray-700/50"
      }`}
    >
      <Link href={`/chats/${chatId}`} className={`chatRow m-1 flex-1`}>
        <ChatBubbleLeftIcon className="h-5 w-5 text-gray-300" />
        <p className="text-white w-[100px] flex-1 hidden md:inline-flex truncate ">
          {chatboxName === "" ? `New Chat` : chatboxName}
        </p>
      </Link>
      {active && (
        <div className="items-center py-5">
          <TrashIcon
            onClick={deleteChat}
            className="h-5 w-5 text-gray-300 hover:text-red-700"
          />
        </div>
      )}
    </div>
  );
}

export default ChatRow;
