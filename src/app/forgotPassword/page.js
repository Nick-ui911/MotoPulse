"use client";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return alert("Enter your registered email");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/forgotPassword", { email });
      alert(res.data.message || "Reset link sent! Check your email.");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </div>
  );
}
