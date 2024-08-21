"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";

function Signup() {
  const [session, setSession] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    setSession(true);

    router.push("/");
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 w-screen bg-blue-900">
      <div className=" overflow-hidden opacity-70 hidden md:block">
        <img className="w-full h-full" src="/login.jpg" alt="login image" />
      </div>
      <div>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-5  items-center justify-center h-screen">
            <h1 className="text-xl font-bold text-white">Welcome to</h1>
            <h1 className="text-5xl animate-bounce font-bold text-white">
              Obo Tutor
            </h1>

            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="First Name"
            />
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Last Name"
            />

            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Email"
            />
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="w-80 p-2 animate-pulse hover:bg-blue-950 bg-blue-500 rounded-xl text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
