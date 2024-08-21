"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";

export default function Home() {
  const session = false;
  const router = useRouter();

  if (session) {
    router.push("/chat");
    return null; // To avoid rendering anything while redirecting
  }

  return <Login />;
}
