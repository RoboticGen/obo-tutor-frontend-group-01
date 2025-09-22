"use client";
import React, { useEffect } from "react";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

function ChatInterface({ params }) {
  const router = useRouter();
  const chatId = params.id;
  const { userId, messages, setMessages } = useGlobalContext();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }

    console.log("chat opend");
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/messages/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(res.data);
        console.log(messages, "messages");
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [chatId, setMessages, router]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* chat  */}

      <Chat chatId={chatId} />

      {/* chat input  */}

      <ChatInput chatId={chatId} />
    </div>
  );
}

export default ChatInterface;
