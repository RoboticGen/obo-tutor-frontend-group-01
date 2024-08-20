"use client";

import React, { createContext, useEffect, useState } from "react";

const globalContext = createContext({
  chats: [],
  setChats: () => {},

  messages: [],
  setMessages: () => {},
});

const newChats = [
  {
    id: 1,
    name: "Chat 1",
  },
  {
    id: 2,
    name: "Chat 2",
  },
  {
    id: 3,
    name: "Chat 3",
  },
  {
    id: 4,
    name: "Chat 4",
  },
  {
    id: 5,
    name: "Chat 5",
  },
];

function GlobalContextProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setChats(newChats);
  }, []);

  return (
    <globalContext.Provider
      value={{
        chats,
        setChats,
        messages,
        setMessages,
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
