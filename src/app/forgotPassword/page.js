"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/forgotPassword", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
          </div>

          {/* Success card */}
          <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-600 via-green-500 to-green-600"></div>
            
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg shadow-green-600/50">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
              <p className="text-zinc-400 mb-6">
                We&apos;ve sent a password reset link to<br />
                <span className="text-white font-medium">{email}</span>
              </p>

              <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-zinc-300 mb-2">
                  Didn&apos;t receive the email?
                </p>
                <ul className="text-xs text-zinc-500 space-y-1 list-disc list-inside">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email</li>
                  <li>Wait a few minutes for the email to arrive</li>
                </ul>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 mb-3"
              >
                Try Another Email
              </button>

              <button
                onClick={() => router.push("/login")}
                className="w-full text-zinc-400 hover:text-white font-medium py-2 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        {/* Main card */}
        <div className="relative bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
          {/* Red accent line */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
          
          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-zinc-400">No worries, we&apos;ll send you reset instructions</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-950/50 border border-red-900 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder-zinc-500"
                />
                <Mail className="w-5 h-5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] mb-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to login */}
            <button
              onClick={() => router.push("/login")}
              className="w-full text-zinc-400 hover:text-white font-medium py-2 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          </div>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center text-zinc-600 text-sm mt-6">
          Secure password recovery · Email verification required
        </p>
      </div>
    </div>
  );
}