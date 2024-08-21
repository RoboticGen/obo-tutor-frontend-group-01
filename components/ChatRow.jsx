"use client";

import React, { useState } from "react";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ChatRow({ chatId }) {
  const pathname = usePathname();
  const router = useRouter();
  console.log({ chatId });

  const { chats, setChats } = useGlobalContext();

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(chatId));
  }, [pathname]);

  const deleteChat = (e) => {
    e.stopPropagation();
    setChats(chats.filter((chat) => chat.id !== chatId));
    router.push("/");
  };

  return (
    <div
      className={`flex rounded-lg px-2 justify-center ${
        active && "bg-gray-700/50"
      }`}
    >
      <Link href={`/chat/${chatId}`} className={`chatRow m-1 flex-1`}>
        <ChatBubbleLeftIcon className="h-5 w-5 text-gray-300" />
        <p className="text-white w-[100px] flex-1 hidden md:inline-flex truncate ">
          New Chat is being created mmmmmmmmmmmmm sssssssssssssssssssssss
        </p>
      </Link>
      <div className="items-center py-5">
        <TrashIcon
          onClick={deleteChat}
          className="h-5 w-5 text-gray-300 hover:text-red-700"
        />
      </div>
    </div>
  );
}

export default ChatRow;
