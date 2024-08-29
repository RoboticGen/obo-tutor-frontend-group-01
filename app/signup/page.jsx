"use client";
import Signup from "@/components/Signup";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContextProvider";

function SignupPage() {
  const { isLogged, setIsLogged } = useGlobalContext();
  const router = useRouter();
  if (localStorage.getItem("token")) {
    setIsLogged(true);
    router.push("/chats");
  }

  return <Signup />;
}

export default SignupPage;
