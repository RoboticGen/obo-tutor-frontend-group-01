"use client";
import Signup from "@/components/Signup";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContextProvider";

function SignupPage() {
  const { setIsLogged } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
      router.push("/chats");
    }
  }, [setIsLogged, router]);

  return <Signup />;
}

export default SignupPage;
