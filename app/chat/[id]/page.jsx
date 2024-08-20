import React from "react";
import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

function ChatInterface({ params }) {
  const chatId = params.id;

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
