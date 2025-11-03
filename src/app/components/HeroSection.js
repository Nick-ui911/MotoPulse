"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center  overflow-hidden">
      <Image
        src="/moto-pulse image.png"
        alt="Moto Pulse Hero"
        fill
        priority
        quality={80}
        className="object-cover object-center -z-10"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Section */}
      <div
        className={`absolute left-6 sm:left-16 top-1/4 sm:top-1/3 max-w-xl z-10 text-white transition-all duration-1000 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-red-600 leading-tight">
          MOTO <br /> PULSE
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Track your bike’s maintenance, get service reminders, and ride
          stress-free.
        </p>
      </div>

      {/* CTA Section */}
      <div
        className={`absolute bottom-6 sm:bottom-12 left-0 right-0 z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 transition-all duration-1000 delay-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Get Started Button */}
        {!user && (
          <button
            onClick={() => router.push("/login")}
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-red-500/50 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
            <span className="relative flex items-center justify-center gap-2">
              Get Started
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        )}

        {/* Learn More Button */}
        <button
          onClick={() => router.push("/LearnMore")}
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/80 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold text-white shadow-2xl border border-gray-600/50 hover:border-gray-500 transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-gray-500/30 transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            Learn More
            <span className="w-2 h-2 bg-red-400 rounded-full opacity-60 group-hover:animate-pulse" />
          </span>
        </button>
      </div>
    </section>
  );
}
