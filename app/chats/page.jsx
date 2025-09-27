"use client";
import Image from "next/image";
import { SunIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ChatHome({ params }) {
  const { userId, setUserId } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-white px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <SparklesIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Obo Tutor
          </h1>
          <p className="text-xl text-blue-600 font-medium">
            Your AI-powered learning companion
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to start learning?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Create a new chat to begin your personalized learning journey. I can help you with homework, 
            explain complex concepts, solve problems, and explore new topics together.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Click on "New Chat" in the sidebar to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
