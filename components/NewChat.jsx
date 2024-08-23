import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../context/GlobalContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";

function NewChat() {
  const { chats, setChats, userId } = useGlobalContext();
  const router = useRouter();

  const createNewChat = async () => {
    // const newChat = {
    //   id: chats.length + 1,
    //   name: `Chat ${chats.length + 1}`,
    // };
    // setChats([...chats, newChat]);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/chatbox",
        {
          user_id: userId,
          chat_name: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      console.log(res.data);
      setChats([...chats, res.data]);
      router.push(`/chats/${userId}/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={createNewChat}
      className="border-blue-600 animate-pulse border chatRow my-2"
    >
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
