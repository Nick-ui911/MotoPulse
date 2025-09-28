"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/Redux/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/apiUrl";
import axios from "axios";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "My Bikes", href: "/MyBikes" },
    { name: "Services", href: "/Services" },
    { name: "Reminders", href: "/Reminders" },
    { name: "WorkShops", href: "/WorkShops" },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
  
    try {
      await axios.post(BASE_URL + "/logout"); // logout request
      dispatch(clearUser());
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`w-full px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
  }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg sm:text-xl">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white">
                  MOTO<span className="text-red-500">PULSE</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                  SERVICE REVOLUTION
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Nav items (desktop only when logged in) */}
          {user && (
            <div className="hidden md:flex flex-1 justify-center items-center space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm lg:text-base text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 hover:w-full" />
                </Link>
              ))}
            </div>
          )}

          {/* Right: Buttons & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-white/90 text-xs sm:text-sm">
                    Welcome, {user.name || user.email || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              pathname !== "/login" && (
                <button
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              )
            )}

            {/* Mobile Menu Toggle */}
            {user && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <div className="space-y-1.5">
                  <span
                    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 mt-4 sm:mt-6"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 space-y-3 sm:space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-sm sm:text-base text-white/90 hover:text-white font-medium py-2 px-3 sm:px-4 rounded-lg hover:bg-white/5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-3 sm:pt-4">
                <div className="text-white/70 text-xs sm:text-sm mb-2">
                  {user.name || user.email || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
          isScrolled ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </header>
  );
}
