"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const features = [
  {
    title: "Service Tracking",
    desc: "Track all your bike services with dates, costs, and history.",
    icon: "🛠️",
    gradient: "from-red-500 to-orange-600",
    delay: "0",
  },
  {
    title: "Service Reminders",
    desc: "Get notified before your next bike service is due.",
    icon: "⏰",
    gradient: "from-orange-500 to-yellow-600",
    delay: "100",
  },
  {
    title: "Real-time Notifications",
    desc: "Instant alerts for service updates and reminders.",
    icon: "🔔",
    gradient: "from-red-600 to-pink-600",
    delay: "200",
  },
  {
    title: "Bike Health Insights",
    desc: "Monitor your bike's condition and maintenance needs.",
    icon: "🏍️",
    gradient: "from-pink-500 to-red-600",
    delay: "300",
  },
];

const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), parseInt(feature.delay));
    return () => clearTimeout(timer);
  }, [feature.delay]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative bg-gradient-to-br from-zinc-900 to-black border-2 rounded-2xl p-8 h-full transition-all duration-500 overflow-hidden group ${
          isHovered
            ? "border-red-500 shadow-2xl shadow-red-500/20 -translate-y-2"
            : "border-zinc-800"
        }`}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        ></div>

        {/* Glow effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
        ></div>

        <div className="relative z-10">
          {/* Icon container with animation */}
          <div
            className={`text-6xl mb-6 transform transition-all duration-500 ${
              isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            }`}
          >
            <div className="inline-block relative">
              {feature.icon}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
              ></div>
            </div>
          </div>

          {/* Title with gradient */}
          <h3
            className={`text-2xl font-bold mb-3 transition-all duration-300 ${
              isHovered
                ? `bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`
                : "text-red-500"
            }`}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {feature.desc}
          </p>

          {/* Learn more arrow */}
          <div
            className={`mt-6 flex items-center gap-2 text-red-500 font-semibold transition-all duration-300 ${
              isHovered
                ? "translate-x-2 opacity-100"
                : "translate-x-0 opacity-0"
            }`}
          >
            <span>Learn More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
        ></div>
      </div>
    </div>
  );
};

const FeaturesPage = () => {
  const router = useRouter();
  const user = useSelector((store) => store.user.user);
  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
              Moto
            </span>
            <span className="text-white"> Pulse</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to keep your bike running smoothly
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        {!user && (
          <div className="mt-20 text-center">
            <button
              onClick={() => router.push("/login")}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesPage;
