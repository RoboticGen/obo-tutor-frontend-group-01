"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const globalContext = createContext({
  userId: null,
  setUserId: () => {},
  chats: [],
  setChats: () => {},

  messages: [],
  setMessages: () => {},
});

function GlobalContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("userId", userId);
        const response = await axios.get(
          `http://localhost:8000/chatbox/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChats(response.data); // Access the data after the promise resolves
      } catch (error) {
        console.error("Error fetching chatboxes:", error);
      }
    };

    if (userId) {
      fetchChats(); // Call the async function
    }
  }, [userId]);

  return (
    <globalContext.Provider
      value={{
        chats,
        setChats,
        messages,
        setMessages,
        userId,
        setUserId,
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
