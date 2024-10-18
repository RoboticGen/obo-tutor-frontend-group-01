"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function App() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [uploadResponse, setUploadResponse] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin-token")) {
      router.push("/");
    }
  }, []);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    router.push("/admin");
  };

  const handleFileUpload = async () => {
    setUploadResponse("");
    setIsLoaded(true);
    const formData = new FormData();

    // Append all selected files to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // Ensure the field name is 'files'
    }

    try {
      // Make POST request to the FastAPI backend
      const response = await axios.post(
        process.env.NEXT_PUBLIC_DOMAIN_NAME_MODEL + "/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set the response state to display feedback
      setUploadResponse(response.data.message);
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files");

      setUploadResponse("Failed to upload files");
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <div className="flex bg-slate-600 h-screen flex-col items-center justify-center">
      <div className="flex justify-between items-center ">
        <h1 className="p-5 font-extrabold text-3xl text-amber-50">
          Obo Tutor-Admin Panel
        </h1>
        <Link href="/admin/profiles">
          <button className="p-5 m-5 rounded-lg text-white bg-slate-800 hover:bg-slate-700">
            Update Student Profiles
          </button>
        </Link>

        <button
          className="p-5 m-5 rounded-lg text-white bg-slate-800 hover:bg-slate-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <h2 className="text-red-500">Maximum 250 MB Size</h2>

      <div className="flex border border-blue-50 p-10 text-xl text-white">
        <input
          className="bg-slate-800 p-5 rounded-md"
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
        />

        <button
          className="p-5 bg-slate-800 rounded-lg ml-5 hover:bg-slate-700"
          onClick={handleFileUpload}
        >
          Upload Files
        </button>
      </div>

      {isLoaded && (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {uploadResponse && (
        <div className="bg-slate-900/50 text-white m-5 p-5">
          <div>
            <h2>Upload Response:</h2>
            <h3>{uploadResponse}</h3>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="mt-5">
              <h4>Uploaded Files:</h4>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-green-400">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
