import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "../context/GlobalContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
        process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + "/chatbox",
        {
          chat_name: "",
          user_id: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      setChats([res.data, ...chats]);
      //refresh the page

      router.push(`/chats/${res.data.id}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
      onClick={createNewChat}
      className="border-blue-600 animate-pulse border chatRow my-2"
    >
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
