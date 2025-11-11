"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/Redux/userSlice";
import { BASE_URL } from "@/constants/apiUrl";
import axios from "axios";
import Image from "next/image";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setPhotoUrl(user.PhotoUrl || "");
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "devworldimage-cloud");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dj7i4ts8b/image/upload",
        formData
      );
      setPhotoUrl(res.data.secure_url);
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image!");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/editProfile`,
        { name, email, phone, PhotoUrl: photoUrl },
        { withCredentials: true, timeout: 8000 }
      );

      const updatedUser = res?.data?.data?.user;
      if (updatedUser && (updatedUser.id || updatedUser._id)) {
        dispatch(setUser(updatedUser));
        alert("Profile updated successfully!");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-26 px-4 ">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)] pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-b from-zinc-900 to-black p-10 rounded-3xl w-full max-w-lg space-y-7 border border-red-600/30 backdrop-blur-xl shadow-[0_0_80px_-12px_rgba(220,38,38,0.5),inset_0_0_60px_rgba(220,38,38,0.03)]"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <p className="text-gray-500 text-sm">
            Update your personal information
          </p>
        </div>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center space-y-4 pb-6 border-b border-red-900/30">
          <div className="relative group">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full border-4 border-red-600/50 
                     shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300 
                     group-hover:border-red-500 group-hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-red-600/30 border-dashed flex items-center justify-center bg-zinc-900 shadow-inner">
                <svg
                  className="w-12 h-12 text-red-500/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="w-full">
            <label className="relative block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {uploading ? "Uploading..." : "Change Photo"}
              </div>
            </label>
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 ml-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3.5 bg-zinc-950/50 text-gray-400 rounded-xl border border-red-900/40 cursor-not-allowed focus:outline-none shadow-inner"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-red-400">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Locked</span>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 ml-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 bg-zinc-950/50 border border-red-800/40 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400 ml-1">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 bg-zinc-950/50 border border-red-800/40 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all duration-300"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="relative w-full mt-8 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span>Save Changes</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
