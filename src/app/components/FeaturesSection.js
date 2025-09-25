"use client";
import React from "react";
import { Calendar, Bell, Wrench, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";

const FeaturesSection = () => {
  const user = useSelector((state) => state.user.user);
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Track Service History",
      description:
        "Keep detailed records of all your motorcycle maintenance and repairs",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Service Reminders",
      description: "Never miss important maintenance with smart notifications",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Nearby Workshops",
      description: "Find trusted service centers and mechanics in your area",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Maintenance Reports",
      description: "Get detailed analytics and insights on your bike's health",
    },
  ];

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Keep Your Bike Running
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive motorcycle maintenance made simple with powerful tools
            and insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-red-500"
            >
              {/* Icon Container */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg p-3 w-fit mb-4 group-hover:scale-110 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-1 border border-red-500">
              Get Started Today
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
