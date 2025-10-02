"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield,
  Check,
  X,
} from "lucide-react";
import { setUser } from "@/Redux/userSlice";

export default function AddPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Password strength validation
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: [] };

    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
      feedback.push({ text: "At least 8 characters", valid: true });
    } else {
      feedback.push({ text: "At least 8 characters", valid: false });
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
      feedback.push({ text: "Contains uppercase letter", valid: true });
    } else {
      feedback.push({ text: "Contains uppercase letter", valid: false });
    }

    if (/[a-z]/.test(password)) {
      score += 1;
      feedback.push({ text: "Contains lowercase letter", valid: true });
    } else {
      feedback.push({ text: "Contains lowercase letter", valid: false });
    }

    if (/\d/.test(password)) {
      score += 1;
      feedback.push({ text: "Contains number", valid: true });
    } else {
      feedback.push({ text: "Contains number", valid: false });
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
      feedback.push({ text: "Contains special character", valid: true });
    } else {
      feedback.push({ text: "Contains special character", valid: false });
    }

    return { score, feedback };
  };

  const passwordStrength = getPasswordStrength(password);
  const isPasswordMatch =
    password && confirmPassword && password === confirmPassword;
  const isFormValid = passwordStrength.score >= 3 && isPasswordMatch;

  const getStrengthColor = (score) => {
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (score) => {
    if (score <= 2) return "Weak";
    if (score <= 3) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) {
      setError(
        "Please ensure password meets requirements and matches confirmation"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/addPassword`,
        { password },
        { withCredentials: true } 
      );
      // Update Redux store with the updated user data
      const updatedUser = response?.data?.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
      }
      setSuccess("Password added successfully!");

      // Redirect to profile after success
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      console.error("Add password error:", error);
      setError(
        error?.response?.data?.error ||
          "Failed to add password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push("/profile");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-red-500/5 rounded-3xl"></div>

          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Success Message */}
            {success && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-3xl transition-all duration-500 z-50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center p-6 animate-in fade-in zoom-in duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                    <CheckCircle className="w-16 h-16 text-green-400 relative z-10 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">
                    Password Added!
                  </h3>
                  <p className="text-gray-300 text-base">{success}</p>
                  <div className="mt-3 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-3xl z-40">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-red-500/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-white/80 mt-3 text-sm">
                    Adding password...
                  </p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleGoBack}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="bg-red-600/20 p-3 rounded-full">
                  <Shield className="w-8 h-8 text-red-400" />
                </div>
                <div className="w-9"></div> {/* Spacer for centering */}
              </div>

              <div className="relative inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent mb-2">
                  Add Password
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
              </div>
              <p className="text-gray-400 mt-4 text-sm">
                Secure your account with a strong password
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm animate-in slide-in-from-top duration-300">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-red-300 text-sm">{error}</span>
                    </div>
                    <button
                      onClick={() => setError("")}
                      type="button"
                      className="text-red-400 hover:text-red-300 transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="password"
                >
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-red-400">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        Password Strength:
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.score <= 2
                            ? "text-red-400"
                            : passwordStrength.score <= 3
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                          passwordStrength.score
                        )}`}
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 mt-2">
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center text-xs">
                          {item.valid ? (
                            <Check className="w-3 h-3 text-green-400 mr-2" />
                          ) : (
                            <X className="w-3 h-3 text-red-400 mr-2" />
                          )}
                          <span
                            className={
                              item.valid ? "text-green-400" : "text-red-400"
                            }
                          >
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-red-400">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center text-xs mt-2">
                    {isPasswordMatch ? (
                      <>
                        <Check className="w-3 h-3 text-green-400 mr-2" />
                        <span className="text-green-400">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 text-red-400 mr-2" />
                        <span className="text-red-400">
                          Passwords don't match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group overflow-hidden relative ${
                  isFormValid && !loading
                    ? "bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white hover:shadow-2xl hover:shadow-red-500/25"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Add Password</span>
                </div>
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <div className="flex items-start">
                <Shield className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-300 text-xs">
                    Your password will be securely encrypted and stored. You can
                    use this password to log in directly without Google
                    authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
