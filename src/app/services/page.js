"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const services = [
  {
    title: "Bike Service Management",
    desc: "Manage complete bike service records including service dates, costs, and service centers.",
    icon: "🧾",
    gradient: "from-red-500 via-orange-500 to-red-600",
    accentColor: "red",
    particles: ["📋", "📝", "✅"],
  },
  {
    title: "Automated Service Alerts",
    desc: "Receive timely notifications before your bike service is due.",
    icon: "🔔",
    gradient: "from-orange-500 via-yellow-500 to-orange-600",
    accentColor: "orange",
    particles: ["⏰", "📱", "✨"],
  },
  {
    title: "Service History Reports",
    desc: "View detailed service history to track maintenance and expenses.",
    icon: "📊",
    gradient: "from-red-600 via-pink-500 to-red-600",
    accentColor: "pink",
    particles: ["📈", "💰", "🗂️"],
  },
  {
    title: "Smart Maintenance Tips",
    desc: "Get personalized bike maintenance tips based on service data.",
    icon: "⚙️",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    accentColor: "yellow",
    particles: ["🔧", "💡", "🎯"],
  },
];

const FloatingParticle = ({ emoji, delay, index }) => {
  return (
    <div
      className="absolute text-2xl opacity-0 pointer-events-none animate-float"
      style={{
        left: `${20 + index * 25}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + index}s`,
      }}
    >
      {emoji}
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="group relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 rounded-3xl p-8 h-full transition-all duration-500 overflow-hidden cursor-pointer"
        style={{
          borderColor: isHovered ? `rgb(239 68 68)` : `rgb(39 39 42)`,
          transform: isHovered
            ? `perspective(1000px) rotateX(${
                mousePosition.y * 0.5
              }deg) rotateY(${
                mousePosition.x * 0.5
              }deg) translateY(-8px) scale(1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.2)`
            : "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Animated mesh gradient background */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 animate-gradient-slow`}
          ></div>
          <div
            className={`absolute inset-0 bg-gradient-to-tl ${service.gradient} opacity-5 animate-gradient-reverse`}
          ></div>
        </div>

        {/* Spotlight effect following mouse */}
        {isHovered && (
          <div
            className="absolute w-96 h-96 pointer-events-none transition-all duration-200 ease-out"
            style={{
              background: `radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)`,
              left: mousePosition.x * 10 + 50 + "%",
              top: mousePosition.y * 10 + 50 + "%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        )}

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {service.particles.map((particle, i) => (
              <FloatingParticle
                key={i}
                emoji={particle}
                delay={i * 0.3}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div
            className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${service.gradient} animate-expand-width`}
          ></div>
          <div
            className={`absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b ${service.gradient} animate-expand-height`}
          ></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div
            className={`absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l ${service.gradient} animate-expand-width`}
          ></div>
          <div
            className={`absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t ${service.gradient} animate-expand-height`}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with 3D effect */}
          <div className="relative mb-6 inline-block">
            <div
              className={`text-7xl transition-all duration-500 ${
                isHovered ? "scale-125" : "scale-100"
              }`}
              style={{
                transform: isHovered
                  ? `rotateX(${mousePosition.y * 2}deg) rotateY(${
                      mousePosition.x * 2
                    }deg) scale(1.25)`
                  : "rotateX(0deg) rotateY(0deg) scale(1)",
                filter: isHovered
                  ? "drop-shadow(0 10px 20px rgba(239, 68, 68, 0.4))"
                  : "none",
              }}
            >
              {service.icon}
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
            ></div>
          </div>

          {/* Number badge */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:border-red-500 flex items-center justify-center font-bold text-zinc-500 group-hover:text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            {index + 1}
          </div>

          {/* Title with typewriter effect on hover */}
          <h3
            className={`text-2xl font-extrabold mb-4 transition-all duration-500 ${
              isHovered
                ? `bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`
                : "text-red-500"
            }`}
          >
            {service.title}
          </h3>

          {/* Divider line */}
          <div
            className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-700 mb-4`}
          ></div>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-base">
            {service.desc}
          </p>

          {/* Interactive button */}
          <div className="mt-8 flex items-center gap-3">
            <button
              className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden group/btn ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-100 group-hover/btn:opacity-90`}
              ></div>
              <span className="relative z-10 flex items-center gap-2 text-white">
                Explore
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats or info on hover */}
          <div
            className={`mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-gray-500 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          ></div>
        </div>

        {/* Animated border glow */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
        ></div>
      </div>
    </div>
  );
};

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing orbs */}
        <div
          className="absolute w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{
            top: "10%",
            left: "5%",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        ></div>
        <div
          className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{
            top: "60%",
            right: "10%",
            animationDelay: "2s",
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{
            bottom: "20%",
            left: "40%",
            animationDelay: "4s",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        ></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-red-500/20 rounded-lg animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-orange-500/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-yellow-500/20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
              <span className="text-red-500 font-semibold tracking-wider uppercase text-sm animate-pulse">
                Premium Services
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
            <span className="inline-block">Our</span>{" "}
            <span className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Services
            </span>
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Powerful services designed to{" "}
            <span className="text-red-500 font-semibold">
              simplify bike maintenance
            </span>{" "}
            and service tracking with cutting-edge technology.
          </p>

          {/* Animated divider */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="h-1 w-8 bg-red-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            <div
              className="h-1 w-8 bg-orange-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Stats counter */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            {[
              { num: "10K+", label: "Active Users" },
              { num: "50K+", label: "Services Tracked" },
              { num: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-3xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.num}
                </div>
                <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid with stagger animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-24 text-center space-y-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to <span className="text-red-500">Transform</span> Your Bike
              Maintenance?
            </h3>
            <p className="text-gray-400 mb-8">
              Join thousands of riders who trust Moto Pulse for their bike
              service management
            </p>
          </div>

          {!user && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 overflow-hidden bg-[length:200%_100%] hover:bg-right animate-gradient">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No credit card required
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              24/7 Support
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes expand-width {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes expand-height {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 8s ease infinite;
        }
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 10s ease infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-expand-width {
          animation: expand-width 0.5s ease-out forwards;
        }
        .animate-expand-height {
          animation: expand-height 0.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Services;
