"use client";
import React from "react";
import {
  CircleStackIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ChatInput({ chatId }) {
  const {
    chats,
    setChats,
    messages,
    newChatboxNames,
    setNewChatboxNames,
    setMessages,
    userId,
    updateMessageList,
    ...other
  } = useGlobalContext();

  const router = useRouter();

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  const handleTextareaChange = (e) => {
    setPrompt(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      chatbox_id: chatId,
      message: prompt,
      message_type: "user",
      user_id: 0,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setPrompt("");

    // Send the message to the server from axios
    try {
      setIsLoaded(true);

      const response = await axios.post(
        process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + "/chatbox/message",
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (messages.length === 0) {
        const responseNew = await axios.put(
          process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/chatbox/${chatId}`,
          {
            chat_name: `${prompt}`,
            user_id: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setIsLoaded(false);

        updateMessageList(responseNew.data);

        setNewChatboxNames([...newChatboxNames, chatId]);
      }

      const answer = {
        user_id: userId,
        chatbox_id: chatId,
        message: response.data.result,
        related_images: response.data.relevant_images,
        message_type: "gpt",
      };

      setMessages((prevMessages) => [...prevMessages, answer]);
      setIsLoaded(false);
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
    <div className="border-t border-gray-200 bg-white px-4 py-4">
      <div className="max-w-4xl mx-auto">
        {isLoaded ? (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Obo Tutor is thinking...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={sendMessage} className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 placeholder-gray-500"
                  value={prompt}
                  onChange={handleTextareaChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Ask Obo Tutor anything..."
                  rows={1}
                  style={{
                    minHeight: '44px',
                    maxHeight: '120px'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!prompt.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </form>
        )}

        {/* Input hint */}
        <div className="flex items-center justify-center mt-3 text-xs text-gray-400">
          <span>Press Enter to send, Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
