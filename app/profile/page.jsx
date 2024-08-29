"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@gmail.com",
    phone: "1234567890",
    age: 25,
    learning_rate: "Active",
    role: "Student",
    communication_format: "Textbook",
    tone_style: "Neutral",
  });

  //   useEffect(() => {
  //     if (!localStorage.getItem("token")) {
  //       router.push("/");
  //     } else {
  //       const fetchUser = async () => {
  //         try {
  //           const response = await axios.get(
  //             `http://localhost:8000/chatbox/user`,
  //             {
  //               headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
  //               },
  //             }
  //           );
  //           setUser(response.data);
  //         } catch (error) {
  //           if (error.response.status === 401) {
  //             toast.error("Please login to continue");
  //             localStorage.removeItem("token");
  //             router.push("/");
  //           } else {
  //             toast.error("Something went wrong. Please try again");
  //           }
  //         }
  //       };
  //       fetchUser();
  //     }
  //   }, []);

  return (
    <div>
      {user && (
        <div className="flex bg-blue-900 h-screen">
          <div className="flex flex-col p-10 gap-5 items-center bg-blue-950/50">
            <img src="/prof.png" className="h-10 w-10 rounded-full"></img>
            <div className="flex flex-col gap-5 text-white">
              <div className="flex gap-2">
                <div className="flex">Name:</div>
                <div className="flex-1">{user.name}</div>
              </div>
              <div className="flex gap-2">
                <div className="flex">Email:</div>
                <div className="flex-1">{user.email}</div>
              </div>
              <div className="flex gap-2">
                <div className="flex">Phone:</div>
                <div className="flex-1">{user.phone}</div>
              </div>
              <div className="flex gap-2">
                <div className="flex">Age:</div>
                <div className="flex-1">{user.age}</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-2 p-10">
              <h1 className="text-5xl animate-bounce font-bold text-center text-white">
                Obo Tutor
              </h1>

              <h3 className="text-left text-white text-xl">
                Edit User Profile
              </h3>

              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-10 items-center">
                    <label className="text-white">Learning Rate</label>
                    <select
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      name="learning_rate"
                      value={user.learning_rate}
                      onChange={(e) =>
                        setUser({ ...user, learning_rate: e.target.value })
                      }
                    >
                      <option value="Visual">Visual</option>
                      <option value="Verbal">Verbal</option>
                      <option value="Active">Active</option>
                      <option value="Intuitive">Intuitive</option>
                      <option value="Reflective">Reflective</option>
                    </select>
                  </div>
                  <div className="flex gap-10 items-center ">
                    <label className="text-white">Tone Style</label>
                    <select
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      name="role"
                      value={user.tone_style}
                      onChange={(e) =>
                        setUser({ ...user, tone_style: e.target.value })
                      }
                    >
                      <option value="Encouraging">Encouraging</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Informative">Informative</option>
                      <option value="Friendly">Friendly</option>
                    </select>
                  </div>
                  <div className="flex gap-10 items-center">
                    <label className="text-white">Communication Format</label>
                    <select
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      name="communication_format"
                      value={user.communication_format}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          communication_format: e.target.value,
                        })
                      }
                    >
                      <option value="Textbook">Textbook</option>
                      <option value="Layman">Layman</option>
                      <option value="Storytelling">Storytelling</option>
                    </select>
                  </div>

                  <button className="p-2 bg-blue-500 rounded-xl text-white">
                    Save
                  </button>
                </div>
              </form>

              <h3 className="text-left text-white text-xl">Change Password</h3>

              <form>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-10 items-center">
                    <label className="text-white">Old Password</label>
                    <input
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      type="password"
                      name="old_password"
                    />
                  </div>
                  <div className="flex gap-10 items-center">
                    <label className="text-white">New Password</label>
                    <input
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      type="password"
                      name="new_password"
                    />
                  </div>
                  <div className="flex gap-10 items-center">
                    <label className="text-white">Confirm Password</label>
                    <input
                      className="p-2 rounded-xl focus:outline-none outline-none active:outline-none"
                      type="password"
                      name="confirm_password"
                    />
                  </div>
                  <button className="p-2 bg-blue-500 rounded-xl text-white">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
