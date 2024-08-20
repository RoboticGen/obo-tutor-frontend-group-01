"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import React from "react";
import { useEffect } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "./Message";

const newMassages = [
  {
    msg_id: 1,
    chat_id: 1,
    msg: "Hello",
    role: "user",
  },
  {
    msg_id: 2,
    chat_id: 1,
    msg: "Hi",
    role: "admin",
  },
  {
    msg_id: 3,
    chat_id: 2,
    msg: "Hello",
    role: "user",
  },
  {
    msg_id: 4,
    chat_id: 2,
    msg: "Hi",
    role: "admin",
  },
  {
    msg_id: 5,
    chat_id: 3,
    msg: "Hello",
    role: "user",
  },
  {
    msg_id: 6,
    chat_id: 3,
    msg: "Hi",
    role: "admin",
  },
  {
    msg_id: 7,
    chat_id: 4,
    msg: "Hello",
    role: "user",
  },
  {
    msg_id: 8,
    chat_id: 4,
    msg: "Hi",
    role: "admin",
  },
  {
    msg_id: 9,
    chat_id: 5,
    msg: "Hello",
    role: "user",
  },
  {
    msg_id: 10,
    chat_id: 5,
    msg: "Hi",
    role: "admin",
  },
];

function Chat() {
  const { messages, setMessages } = useGlobalContext();
  const messageEndRef = React.useRef(null);

  useEffect(() => {
    setMessages(newMassages);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.empty && (
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
