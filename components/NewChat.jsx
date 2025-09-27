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
      if (error.response.status === 401) {
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
    <button
      onClick={createNewChat}
      className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-200 group"
    >
      <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
      <span className="font-medium">New Chat</span>
    </button>
  );
}

export default NewChat;
