"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  Mail,
  Lock,
  User,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { BASE_URL } from "@/constants/apiUrl";
import { setUser } from "@/Redux/userSlice";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebaseWeb";

export default function AuthComponent() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleViewToggle = () => {
    setIsLoginView(!isLoginView);
    setShowSuccessMessage(false);
    setErrorMessage("");
  };

  // Standard Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error before request
    setLoading(true); // Show loader

    // Form validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      setLoading(false); // Hide loader
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      // Only dispatch user and show success if we get here (no error was thrown)
      dispatch(setUser(res.data?.user));

      // Show success message
      setSuccessMessage("Login Successful! Welcome back!");
      setShowSuccessMessage(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccessMessage(false);
        setEmail("");
        setPassword("");

        // Navigate to homepage after successful login
        router.push("/");
      }, 2000);
    } catch (error) {
      // Handle error appropriately
      setErrorMessage(
        error?.response?.data?.error ||
          "Login failed. Please check your credentials and try again."
      );
      console.log(error?.response?.data?.error || "Login failed. Try again.");
      setShowSuccessMessage(false); // Ensure success message is not shown
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Standard Signup Function
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error before request
    setLoading(true); // Show loader

    // Form validation
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields");
      setLoading(false); // Hide loader
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { name, email, password },
        { withCredentials: true }
      );

      // Only dispatch user and show success if we get here (no error was thrown)
      dispatch(setUser(res.data?.user));

      // Show success message
      setSuccessMessage("Sign up Successful! Welcome to our platform!");
      setShowSuccessMessage(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccessMessage(false);
        setEmail("");
        setPassword("");
        setName("");

        // Navigate to homepage after successful signup
        router.push("/");
      }, 2000);
    } catch (error) {
      // Handle error appropriately
      setErrorMessage(
        error?.response?.data?.error ||
          "Signup failed. This email may already be registered."
      );
      console.log(error?.response?.data?.error || "Signup failed. Try again.");
      setShowSuccessMessage(false); // Ensure success message is not shown
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle form submission based on current view
  const handleSubmit = (e) => {
    if (isLoginView) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

// Google Login Function
const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const { email } = result.user;

    const res = await axios.post(
      BASE_URL + "/googleLogin",
      { idToken, email },
      { withCredentials: true }
    );

    dispatch(setUser(res?.data?.user));

    // Show success message
    setSuccessMessage("Google Login Successful!");
    setShowSuccessMessage(true);

    // Navigate after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      router.push("/");
    }, 2000);

  } catch (error) {
    console.error("Google login error:", error);
    
    // Handle specific errors
    if (error.response?.status === 404) {
      setErrorMessage("Account not found. Please sign up first.");
    } else if (error.response?.status === 400) {
      setErrorMessage(error.response?.data?.error || "Invalid credentials");
    } else if (error.code === "auth/popup-closed-by-user") {
      setErrorMessage("Login cancelled");
    } else if (error.code === "auth/network-request-failed") {
      setErrorMessage("Network error. Please check your connection.");
    } else {
      setErrorMessage("Login failed. Please try again.");
    }
    
 
  } finally {
    setLoading(false);
  }
};

// Google Signup Function
const handleGoogleSignup = async () => {
  try {
    setLoading(true);
    
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    console.log(idToken);
    const { displayName, email, photoURL } = result.user;

    const response = await axios.post(
      BASE_URL + "/googleSignup",
      { name: displayName, email, PhotoUrl: photoURL, idToken },
      { withCredentials: true }
    );

    dispatch(setUser(response.data.user));

    // Show success message
    const message = response.data.isNewUser
      ? "Google Account Connected! Account created successfully."
      : "Welcome back! Signed in successfully.";
    
    setSuccessMessage(message);
    setShowSuccessMessage(true);

    // Navigate after delay
    setTimeout(() => {
      setShowSuccessMessage(false);
      router.push("/");
    }, 2000);

  } catch (error) {
    console.error("Google signup error:", error);
    
    // Handle specific errors
    if (error.response?.status === 400) {
      const errorMsg = error.response?.data?.error;
      if (errorMsg === "Email already exists") {
        setErrorMessage("Account exists. Please login instead.");
      } else {
        setErrorMessage(errorMsg || "Signup failed");
      }
    } else if (error.code === "auth/popup-closed-by-user") {
      setErrorMessage("Signup cancelled");
    } else if (error.code === "auth/network-request-failed") {
      setErrorMessage("Network error. Please check your connection.");
    } else if (error.code === "auth/account-exists-with-different-credential") {
      setErrorMessage("Account exists with different sign-in method");
    } else {
      setErrorMessage("Signup failed. Please try again.");
    }
    

    
  } finally {
    setLoading(false);
  }
};

  // Handle Google auth based on current view
  const handleGoogleAuth = () => {
    if (isLoginView) {
      handleGoogleLogin();
    } else {
      handleGoogleSignup();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-6 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-red-500/5 rounded-3xl"></div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Success Message */}
            {showSuccessMessage && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 rounded-3xl transition-all duration-500 z-50 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center p-6 animate-in fade-in zoom-in duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    <CheckCircle className="w-16 h-16 text-red-400 relative z-10 animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">
                    {isLoginView ? "Welcome Back!" : "Account Created!"}
                  </h3>
                  <p className="text-gray-300 text-base">{successMessage}</p>
                  <div className="mt-3 w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"></div>
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
                  <p className="text-white/80 mt-3 text-sm">Processing...</p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-red-400 bg-clip-text text-transparent mb-2">
                  {isLoginView ? "Welcome Back" : "Join Us"}
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
              </div>
              <p className="text-gray-400 mt-3 text-sm">
                {isLoginView 
                  ? "Sign in to continue your journey" 
                  : "Create your account to get started"
                }
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800/50 rounded-full p-1 border border-gray-700/50">
                <div className="flex">
                  <button
                    onClick={() => !isLoginView && handleViewToggle()}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isLoginView
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => isLoginView && handleViewToggle()}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      !isLoginView
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 backdrop-blur-sm animate-in slide-in-from-top duration-300">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-red-300 text-sm">{errorMessage}</span>
                    </div>
                    <button
                      onClick={() => setErrorMessage("")}
                      type="button"
                      className="text-red-400 hover:text-red-300 transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Name Field - Only for Signup */}
              {!isLoginView && (
                <div className="space-y-1 animate-in slide-in-from-right duration-300">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-red-400">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-red-400">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors group-focus-within:text-red-400">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password - Only for Login */}
              {isLoginView && (
                <div className="flex justify-end">
                  <button
                    onClick={() => router.push("/forgotPassword")}
                    type="button"
                    className="text-xs text-red-400 hover:text-red-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-3 rounded-xl hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <span>{isLoginView ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-gray-900/50 text-gray-400 text-xs backdrop-blur-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full bg-white/5 border border-gray-600/30 text-white py-3 rounded-xl hover:bg-white/10 hover:border-gray-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm group"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-medium text-sm">
                    {isLoginView ? "Sign in with Google" : "Sign up with Google"}
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}