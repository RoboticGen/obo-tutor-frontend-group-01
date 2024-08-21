"use client";
import Image from "next/image";
import { SunIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
import { useGlobalContext } from "@/context/GlobalContextProvider";

export default function Home() {
  const { session } = useGlobalContext();
  const router = useRouter();

  if (session) {
    router.push("/chat");
    return null; // To avoid rendering anything while redirecting
  }

  return <Login />;
}
