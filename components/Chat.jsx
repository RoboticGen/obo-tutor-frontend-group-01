"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import React from "react";
import { useEffect } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "./Message";
import axios from "axios";

function Chat({ chatId }) {
  const { messages, setMessages, userId } = useGlobalContext();
  const messageEndRef = React.useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {!messages.length && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className=" h-10 w-10 text-white mx-auto mt-5 animate-bounce" />
        </>
      )}
      {messages?.map((message) => (
        <Message key={message.msg_id} message={message}></Message>
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
}

export default Chat;
