"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

function Login() {
  const { isLogged, setIsLogged } = useGlobalContext();
  const [session, setSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
      router.push("/chats");
    }
  }, [setIsLogged, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSession(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND}/login`,
        { email, password }
      );

      const token = response.data.access_token;
      const user = response.data.user_details.id;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      setIsLogged(true);
      router.push("/chats");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Invalid credentials");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setSession(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-200 to-blue-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Login Form */}
        <div className="p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-gray-600 text-sm">
                Welcome back! Please sign in to your account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username/Email Input */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-blue-200 placeholder-blue-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-blue-50"
                    placeholder="rgdmin"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-blue-200 placeholder-blue-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-blue-50"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgotten your username or password?
                </a>
              </div>

              {/* Login Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={session}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {session ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Log in"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Side - Blue Background with Robot */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
          {/* Logo and Branding */}
          <div className="text-center text-white z-10">
            <div className="mb-6">

              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Obo Tutor
              </h1>
              <p className="text-sm lg:text-base opacity-75">
                Powered by RoboticGen LABS
              </p>

            </div>
            
            {/* Robot Image */}
            <div className="relative mb-6">
              <Image 
                className="w-48 h-48 lg:w-56 lg:h-56 mx-auto rounded-full object-cover border-4 border-white border-opacity-20" 
                src="/robo-profile.jpg" 
                alt="RoboticGen LABS Robot"
                width={300}
                height={300}
              />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 bg-blue-300 bg-opacity-20 rounded-full"></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-white bg-opacity-5 rounded-full"></div>
          <div className="absolute bottom-20 right-12 w-8 h-8 bg-blue-200 bg-opacity-30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
