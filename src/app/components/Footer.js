"use client";
import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleClick = async () => {
    try {
      if (!email.trim()) {
        alert("Please enter your email!");
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
      }

      alert("Thanks for subscribing!");
      setEmail(""); // reset input
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-700 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(239 68 68) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Main content */}
        <div className="text-center mb-12">
          <div className="inline-block group cursor-pointer mb-6">
            <h3 className="text-5xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              MOTO PULSE
            </h3>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent mt-2 group-hover:via-red-400 transition-colors duration-300"></div>
          </div>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Track your bike&apos;s maintenance, get service reminders, and ride
            stress-free with cutting-edge technology.
          </p>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Service Tracking
              </h3>
              <p className="text-gray-400 text-sm">
                AI-powered maintenance insights
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM7 7h.01M7 3h5L7 8V3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Instant Alerts
              </h3>
              <p className="text-gray-400 text-sm">Never miss a service date</p>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Peace of Mind
              </h3>
              <p className="text-gray-400 text-sm">Ride with confidence</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {["About", "Services", "Contact", "Features", "Support"].map(
            (link, index) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="relative group text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )
          )}
        </div>

        {/* Social/contact section */}
        <div className="flex justify-center space-x-6 mb-8">
          {[
            {
              icon: "M7 2a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5H7zM12 6.865A5.135 5.135 0 1117.135 12 5.135 5.135 0 0112 6.865zm0 8.469A3.334 3.334 0 1115.334 12 3.334 3.334 0 0112 15.334zm5.338-9.87a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
              label: "Instagram",
              url: "https://instagram.com/motopulse",
            },
            {
              icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              label: "Facebook",
              url: "https://facebook.com/motopulse",
            },
            {
              icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
              label: "LinkedIn",
              url: "https://linkedin.com/company/motopulse",
            },
            {
              icon: "M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768m2.46-2.46L20 4",
              label: "X",
              url: "https://x.com/motopulse",
            },
          ].map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social.label}`}
              className="group p-3 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-red-700/20 transition-all duration-300 cursor-pointer hover:scale-110"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={social.icon}
                />
              </svg>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex rounded-full overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 focus-within:border-red-500/50 transition-colors duration-300">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Get updates on new features..."
              className="flex-1 px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Join
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Moto Pulse. All rights reserved.
              Built with passion for riders.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link
                href="/PrivacyPolicy"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/Terms"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/CookiesPolicy"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Animated pulse line */}
          <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent">
            <div className="h-full w-20 bg-white blur-sm animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
