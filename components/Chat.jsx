"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import React from "react";
import { useEffect } from "react";
import { ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Message from "./Message";
import axios from "axios";

function Chat({ chatId }) {
  const { messages, setMessages, userId } = useGlobalContext();
  const messageEndRef = React.useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {!messages.length ? (
        <div className="flex-1 flex items-center justify-center min-h-full">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Obo Tutor
              </h2>
              <p className="text-gray-600 mb-6">
                Your AI-powered learning assistant is ready to help! Ask me anything about your studies, homework, or topics you'd like to explore.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-500 flex items-center justify-center">
                <span>Start typing below to begin your conversation</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {messages?.map((message) => (
            <Message key={message.msg_id} message={message} />
          ))}
        </div>
      )}
      <div ref={messageEndRef}></div>
    </div>
  );
}

export default Chat;
