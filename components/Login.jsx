"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const { isLogged, setIsLogged } = useGlobalContext();

  const [session, setSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
      router.push("/chats");
    }
  }, []);

  const handleLogin = async (e) => {
    setSession(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // send data to server using axios
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + "/login",
        {
          email,
          password,
        }
      );

      const token = response.data.access_token;
      const user = response.data.user_details.id;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      setIsLogged(true);
      router.push(`/chats/`);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Invalid credentials");
      } else {
        toast.error("An error occured");
      }
    }
  };
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 w-screen bg-blue-900">
      <div className=" overflow-hidden opacity-70 hidden md:block">
        <img
          className="w-full h-full"
          content="fill"
          src="/login.webp"
          alt="login image"
        />
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-5  items-center justify-center h-screen">
            <h1 className="text-xl font-bold text-white">Welcome to</h1>
            <h1 className="text-5xl animate-bounce font-bold text-white">
              Obo Tutor
            </h1>
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="password"
              placeholder="Password"
              name="password"
            />

            <button
              type="submit"
              className="w-80 p-2  hover:bg-blue-950 bg-blue-500 rounded-xl text-white"
            >
              Login
            </button>
            <p className="text-white text-center">
              Don&#39;t have an account?{" "}
              <Link href="/signup">
                <span className="text-blue-300 cursor-pointer hover:text-blue-500">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
