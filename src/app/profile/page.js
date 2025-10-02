"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/Redux/userSlice";
import { User, Mail, Phone, Edit, Key, Bike } from "lucide-react";
import Image from "next/image";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // If user already in Redux, skip API call
    if (user) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
          signal: controller.signal,
          timeout: 8000,
        });
        const apiData = res?.data?.data?.user;

        // Only dispatch if user object has _id (or any key you know must exist)
        if (apiData && apiData._id) {
          dispatch(setUser(apiData));
        } else {
          dispatch(setUser(null)); // clear user in store
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Failed to load profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [dispatch, router, user]);

  // Memoized navigation handlers
  const handleEditProfile = () => router.push("/profileEdit");
  const handleAddPassword = () => router.push("/addPassword");

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-black py-22 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-950 border-l-4 border-red-600 text-red-200 px-6 py-4 rounded">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-red-600/30">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-950 to-black p-8 border-b border-red-600/30">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                {user?.photoUrl ? (
                  <Image
                    src={user.photoUrl}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-red-600"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-30 h-30 rounded-full bg-red-600 flex items-center justify-center border-4 border-red-700">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user?.name || "User"}
                </h1>
                <p className="text-red-300">Member since {formattedDate}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleEditProfile}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {!user?.password &&  (
                  <button
                    onClick={handleAddPassword}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition border border-red-600/30 flex items-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Add Password
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Contact Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-red-600 rounded"></div>
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={user?.email}
                />
                <InfoCard
                  icon={<Phone className="w-5 h-5" />}
                  label="Mobile"
                  value={user?.mobileNo || "Not provided"}
                />
              </div>
            </div>

            {/* Bikes Section */}
            {Array.isArray(user?.bikes) && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-600 rounded"></div>
                  My Bikes
                </h2>
                {user.bikes.length === 0 ? (
                  <div className="bg-neutral-800 border border-red-600/20 rounded-lg p-6 text-center">
                    <Bike className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <p className="text-neutral-400">No bikes added yet</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {user.bikes.map((bike) => {
                      const purchase = bike?.purchaseDate
                        ? new Date(bike.purchaseDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )
                        : "N/A";
                      return (
                        <div
                          key={bike.id}
                          className="bg-neutral-800 border border-red-600/20 rounded-lg p-5 hover:border-red-600/40 transition"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-white font-semibold text-lg">
                                {bike.brand} {bike.model}
                              </h3>
                              <p className="text-red-400 text-sm font-mono">
                                {bike.registrationNo}
                              </p>
                            </div>
                            <Bike className="w-6 h-6 text-red-600" />
                          </div>
                          <p className="text-neutral-400 text-sm">
                            Purchased: {purchase}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-neutral-800 border border-red-600/20 rounded-lg p-5 flex items-start gap-4">
      <div className="text-red-600 mt-1">{icon}</div>
      <div>
        <p className="text-neutral-400 text-sm mb-1">{label}</p>
        <p className="text-white font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );
}
