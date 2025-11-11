"use client";

import { BASE_URL } from "@/constants/apiUrl";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddServiceCenterRedBlack() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validatePhone(phone) {
    if (!phone) return true;
    return /^[0-9]{10}$/.test(phone);
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.name.trim() || !form.address.trim()) {
      setError("Name and address are required.");
      return;
    }
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const addressRegex = /^[A-Za-z0-9\s,.-]{5,}$/;

    if (!nameRegex.test(form.name)) {
      setError("Please enter a valid service center name.");
      return;
    }

    if (!addressRegex.test(form.address)) {
      setError("Please enter a valid address.");
      return;
    }
    
    const nameLooksValid =
      /[A-Z]/.test(form.name) || /\s/.test(form.name) || form.name.length > 10;

    if (!nameLooksValid) {
      setError("Please enter a realistic service center name.");
      return;
    }

    const addressValid =
      /[A-Za-z]/.test(form.address) && form.address.length >= 10;

    if (!addressValid) {
      setError("Please enter a valid address with proper details.");
      return;
    }

    if (!validatePhone(form.phone)) {
      setError("Phone must be a 10-digit number.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/addServiceCenter`, form, {
        withCredentials: true,
      });

      setSuccess(true);
      setForm({ name: "", address: "", phone: "" });
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/Workshops');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black text-white p-6">
        <div className="text-center max-w-md">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-red-600 blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative text-8xl mb-4">✅</div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              Thank You!
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-3">
            Service center added successfully
          </p>
          
          <p className="text-sm text-gray-400 mb-8">
            Your contribution helps others find quality service centers
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/Workshops')}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
            >
              View All Centers
            </button>
            
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-black/60 border border-red-700/40 hover:border-red-500/80 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              Add Another Center
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            Redirecting to all centers in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black text-white p-6 pt-24">
      <form
        onSubmit={submit}
        className="bg-black/60 border-2 border-red-700/40 p-8 rounded-2xl shadow-xl shadow-red-600/10 w-full max-w-md backdrop-blur-sm"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              Add Service Center
            </span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <label className="block mb-4">
          <span className="text-sm font-medium text-red-200 mb-1.5 block">
            Center Name *
          </span>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Ex: SpeedMoto Garage"
            className="w-full px-4 py-2.5 bg-black/60 border border-red-700/40 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-all"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-red-200 mb-1.5 block">
            Address *
          </span>
          <textarea
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Full address, city, state, pin"
            rows={3}
            className="w-full px-4 py-2.5 bg-black/60 border border-red-700/40 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-all resize-none"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-red-200 mb-1.5 block">
            Phone (optional)
          </span>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="10-digit number"
            className="w-full px-4 py-2.5 bg-black/60 border border-red-700/40 focus:border-red-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600/30 transition-all"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-600/50"
        >
          {loading ? "Adding…" : "Add Center"}
        </button>
        
        <button
          type="button"
          onClick={() => router.push('/Workshops')}
          className="w-full mt-3 bg-black/40 border border-red-700/40 hover:border-red-500/80 text-gray-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Back to Centers
        </button>
      </form>
    </div>
  );
}