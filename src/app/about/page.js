"use client";
import React, { useState, useEffect, useRef } from "react";

const highlights = [
  {
    title: "Smart",
    desc: "Automated service reminders & alerts",
    icon: "🧠",
    gradient: "from-red-500 to-orange-500",
    stat: "99%",
    statLabel: "Accuracy",
  },
  {
    title: "Reliable",
    desc: "Secure and accurate service history tracking",
    icon: "🔒",
    gradient: "from-orange-500 to-yellow-500",
    stat: "24/7",
    statLabel: "Available",
  },
  {
    title: "Simple",
    desc: "Clean, easy-to-use interface",
    icon: "✨",
    gradient: "from-yellow-500 to-red-500",
    stat: "5min",
    statLabel: "Setup",
  },
  {
    title: "Built for Riders",
    desc: "Designed for daily bike users",
    icon: "🏍️",
    gradient: "from-red-600 to-pink-500",
    stat: "10K+",
    statLabel: "Users",
  },
];

const HighlightCard = ({ highlight, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-zinc-800 rounded-2xl p-6 hover:border-red-500 transition-all duration-500 overflow-hidden h-full">
        {/* Animated background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Glow effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${highlight.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>

        <div className="relative z-10">
          {/* Icon */}
          <div className={`text-5xl mb-4 transition-all duration-500 ${isHovered ? "scale-125 rotate-12" : "scale-100"}`}>
            {highlight.icon}
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
            isHovered ? `bg-gradient-to-r ${highlight.gradient} bg-clip-text text-transparent` : "text-red-500"
          }`}>
            {highlight.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
            {highlight.desc}
          </p>

          {/* Stat badge */}
          <div className={`flex items-center justify-between pt-4 border-t border-zinc-800 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <div>
              <div className={`text-2xl font-black bg-gradient-to-r ${highlight.gradient} bg-clip-text text-transparent`}>
                {highlight.stat}
              </div>
              <div className="text-xs text-gray-500">{highlight.statLabel}</div>
            </div>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${highlight.gradient} opacity-20 group-hover:scale-110 transition-transform duration-300`}></div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l ${highlight.gradient}`}></div>
          <div className={`absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b ${highlight.gradient}`}></div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [rightPanelHovered, setRightPanelHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          setTextVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { icon: "📊", text: "Real-time Analytics", color: "text-red-500" },
    { icon: "🔔", text: "Smart Notifications", color: "text-orange-500" },
    { icon: "📱", text: "Mobile First", color: "text-yellow-500" },
    { icon: "🔐", text: "Bank-level Security", color: "text-red-600" },
  ];

  return (
    <section ref={sectionRef} className="relative bg-black text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          style={{ top: "20%", left: "10%", transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
          style={{ bottom: "20%", right: "15%", transform: `translateY(${scrollY * -0.15}px)` }}
        ></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full transition-all duration-700 ${
              textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-red-500 text-sm font-semibold">About Our Platform</span>
            </div>

            {/* Main heading */}
            <div className={`transition-all duration-700 delay-100 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                <span className="inline-block">About</span>{" "}
                <span className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
                  Moto Pulse
                </span>
              </h2>
              
              <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            </div>

            {/* Description paragraphs */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <p className="text-gray-400 text-lg leading-relaxed">
                Moto Pulse is a <span className="text-white font-semibold">smart bike service tracking platform</span> designed to help
                riders manage maintenance, track service history, and receive timely
                service reminders.
              </p>

              <p className="text-gray-400 text-lg leading-relaxed">
                Our goal is to make bike ownership <span className="text-red-500 font-semibold">hassle-free</span> by providing real-time
                notifications, organized service records, and actionable maintenance
                insights — all in one place.
              </p>
            </div>

            {/* Feature pills */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full hover:border-red-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{feature.icon}</span>
                  <span className={`text-sm font-medium ${feature.color} group-hover:text-white transition-colors`}>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-400 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              {highlights.map((highlight, index) => (
                <HighlightCard key={index} highlight={highlight} index={index} />
              ))}
            </div>

 
          </div>

          {/* Right Visual Panel */}
          <div className={`relative transition-all duration-700 delay-300 ${
            textVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <div
              className="relative"
              onMouseEnter={() => setRightPanelHovered(true)}
              onMouseLeave={() => setRightPanelHovered(false)}
            >
              {/* Large glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-2 border-zinc-800 rounded-3xl p-10 transition-all duration-500 hover:border-red-500 overflow-hidden group">
                {/* Animated mesh background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 animate-gradient-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/10 to-red-500/10 animate-gradient-reverse"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-8">
                  {/* Icon cluster */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    {["🚀", "⚡", "🎯"].map((emoji, i) => (
                      <div
                        key={i}
                        className={`text-5xl transition-all duration-500 ${
                          rightPanelHovered ? "scale-110 rotate-12" : "scale-100"
                        }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl sm:text-5xl font-black text-center bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                    Why Moto Pulse?
                  </h3>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-red-500"></div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-lg leading-relaxed text-center group-hover:text-gray-300 transition-colors">
                    Because your bike deserves <span className="text-red-500 font-semibold">timely care</span>. Moto Pulse ensures you never
                    miss a service, helping extend your bike&apos;s <span className="text-orange-500 font-semibold">life and performance</span>.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-6">
                    {[
                      { num: "10K+", label: "Riders" },
                      { num: "50K+", label: "Services" },
                      { num: "99%", label: "Satisfied" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center group/stat cursor-pointer">
                        <div className="text-3xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">
                          {stat.num}
                        </div>
                        <div className="text-xs text-gray-500 group-hover/stat:text-gray-400 transition-colors">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="relative bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 group-hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">💬</div>
                      <div>
                        <p className="text-gray-300 italic text-sm mb-2">
                        &quot;Moto Pulse has completely transformed how I maintain my bike. No more missed services!&quot;
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                          <div>
                            <div className="text-white font-semibold text-sm">Rajesh Kumar</div>
                            <div className="text-gray-500 text-xs">Daily Commuter</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Trusted by thousands of riders
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-500/20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-orange-500/20 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating particles */}
                {rightPanelHovered && (
                  <>
                    <div className="absolute top-10 right-10 text-2xl animate-float-particle">⭐</div>
                    <div className="absolute bottom-10 left-10 text-2xl animate-float-particle" style={{ animationDelay: "0.5s" }}>✨</div>
                    <div className="absolute top-1/2 right-5 text-2xl animate-float-particle" style={{ animationDelay: "1s" }}>🔥</div>
                  </>
                )}
              </div>

              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10"></div>
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
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
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default About;