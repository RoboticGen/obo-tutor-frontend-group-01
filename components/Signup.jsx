"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContextProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [session, setSession] = useState(false);
  const router = useRouter();

  // get form data
  const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  const handleSignup = async (e) => {
    setSession(true);
    e.preventDefault();

    const formData = new FormData(e.target);

    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const phoneNumber = formData.get("phone_number");
    const age = parseInt(formData.get("age"));
    const email = formData.get("email");
    const password = formData.get("password");
    const communication_rating = 5;
    const leadership_rating = 5;
    const behaviour_rating = 5;
    const responsiveness_rating = 5;
    const difficult_concepts = "";
    const understood_concepts = "";
    const activity_summary = "";
    const role = "Student";
    const tone_style = "Friendly";

    // send data to server using axios

    try {
      const response = await axios.post(domain + "/signup", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
        phone_number: phoneNumber,
        age,
        communication_rating,
        leadership_rating,
        behaviour_rating,
        responsiveness_rating,
        difficult_concepts,
        understood_concepts,
        activity_summary,

        tone_style,
      });

      const token = response.data.access_token;
      const user = response.data.user_id;

      localStorage.setItem("token", token);
      router.push(`/chats/`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        toast.error(error.response.data.detail);
      } else if (error.response.status === 411) {
        toast.error("User already exists");
      } else {
        toast.error("An error occured");
      }
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 w-screen bg-blue-900">
      <div className=" overflow-hidden opacity-70 hidden md:block">
        <img className="w-full h-full" src="/login.webp" alt="login image" />
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
              name="first_name"
            />
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Last Name"
              name="last_name"
            />
            {/* add phone number with country code  but need to add pull list*/}
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Phone Number (07********)  "
              name="phone_number"
            />
            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Age"
              name="age"
            />

            <input
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              name="password"
              className="w-80 p-2 rounded-xl focus:outline-none outline-none active:outline-none"
              type="password"
              placeholder="Password"
            />
            <div className="text-red-400 w-80">
              <p className="text-xs flex">
                Password must be at least 8 characters, contain at least one
                uppercase letter , contain at least one lowercase letter,
                contain at least one digit{" "}
              </p>
            </div>

            <button
              type="submit"
              className="w-80 p-2  hover:bg-blue-950 bg-blue-500 rounded-xl text-white"
            >
              Sign Up
            </button>

            <p className="text-white text-center">
              Already have an account?{" "}
              <Link href="/">
                <span className="text-blue-300 cursor-pointer hover:text-blue-500">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
