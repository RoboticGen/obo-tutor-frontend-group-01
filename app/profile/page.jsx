"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  ArrowLeftIcon,
  Cog6ToothIcon,
  SparklesIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.log(error.response);
          if (error.response.status === 401) {
            toast.error("Please login to continue");
            localStorage.removeItem("token");
            router.push("/");
          } else {
            toast.error("Something went wrong. Please try again");
          }
        }
      };
      fetchUser();
    }
  }, [router]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_DOMAIN_NAME_BACKEND + `/user`,
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Please login to continue");
        localStorage.removeItem("token");
        router.push("/");
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {user && (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                href="/chats"
                className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md border border-blue-200">
              <SparklesIcon className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Obo Tutor</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCircleIcon className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {user.first_name + " " + user.last_name}
                  </h2>
                  <p className="text-blue-600 text-sm">Learning Assistant User</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800 font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <PhoneIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800 font-medium">{user.phone_number || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-gray-800 font-medium">{user.age || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Member since {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Cog6ToothIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">Preferences</h2>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  
                  {/* Tone Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Communication Tone
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      name="tone_style"
                      value={user.tone_style || "Friendly"}
                      onChange={(e) =>
                        setUser({ ...user, tone_style: e.target.value })
                      }
                    >
                      <option value="Encouraging">Encouraging - Motivating and supportive</option>
                      <option value="Neutral">Neutral - Professional and balanced</option>
                      <option value="Informative">Informative - Detailed and educational</option>
                      <option value="Friendly">Friendly - Warm and approachable</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Choose how Obo Tutor communicates with you
                    </p>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      type="number"
                      placeholder="Enter your age"
                      value={user.age || ""}
                      onChange={(e) =>
                        setUser({ ...user, age: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps us customize content appropriate for your level
                    </p>
                  </div>

                  {/* Learning Preferences Info */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">Learning Preferences</h3>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p><strong>Current Tone:</strong> {user.tone_style || "Friendly"}</p>
                      <p><strong>Content Level:</strong> {user.age ? `Age ${user.age} appropriate` : "General"}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <CheckIcon className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    
                    <Link 
                      href="/chats"
                      className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
