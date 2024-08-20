import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../context/GlobalContextProvider";

function NewChat() {
  const { chats, setChats } = useGlobalContext();

  const createNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `Chat ${chats.length + 1}`,
    };
    setChats([...chats, newChat]);
  };

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
