"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      router.push("/chats");
    }
  }, []);

  return <Login />;
}
