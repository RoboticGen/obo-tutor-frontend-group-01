"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const globalContext = createContext({
  userId: null,
  setUserId: () => {},
  chats: [],
  setChats: () => {},

  messages: [],
  setMessages: () => {},

  newChatboxNames: [],
  setNewChatboxNames: () => {},
});

function GlobalContextProvider({ children }) {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newChatboxNames, setNewChatboxNames] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("userId", userId);
        const response = await axios.get(`http://localhost:8000/chatbox/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setChats(response.data); // Access the data after the promise resolves
      } catch (error) {
        console.error("Error fetching chatboxes:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchChats();
    }
  }, []);

  return (
    <globalContext.Provider
      value={{
        chats,
        setChats,
        messages,
        setMessages,
        userId,
        setUserId,
        newChatboxNames,
        setNewChatboxNames,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}

export function useGlobalContext() {
  return React.useContext(globalContext);
}

export default GlobalContextProvider;
