"use client";
import React from "react";
import { PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "@/context/GlobalContextProvider";

function ChatInput({ chatId }) {
  const { messages, setMessages } = useGlobalContext();

  const [prompt, setPrompt] = React.useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      msg_id: messages.length + 1,
      chat_id: chatId,
      msg: prompt,
      role: "user",
    };
    setMessages([...messages, newMessage]);
    setPrompt("");
  };

  return (
    <div className="bg-gray-700/50 mx-5 my-2 text-white rounded-lg text-s">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex items-center">
        <UserIcon className="h-5 w-5 animate-bounce" />
        <input
          className="m focus:ouline-none bg-transparent outline-none flex-1 disabled:cursor-not-allowed disabled:text-white"
          value={prompt}
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message"
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45 animate-pulse" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
