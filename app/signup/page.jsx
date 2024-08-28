"use client";
import Signup from "@/components/Signup";
import React from "react";
import { useRouter } from "next/navigation";

function SignupPage() {
  const router = useRouter();
  if (localStorage.getItem("token")) {
    router.push("/chats");
  }

  return <Signup />;
}

export default SignupPage;
