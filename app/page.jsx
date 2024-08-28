"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";

export default function Home() {
  const router = useRouter();

  if (localStorage.getItem("token")) {
    router.push("/chats");
  }

  return <Login />;
}
