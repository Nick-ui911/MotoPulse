"use client"
import React, { useEffect, useState } from "react";
import {
  Zap,
  Camera,
  DollarSign,
  Bike,
  Wifi,
  FileText,
  BarChart3,
  Gauge,
  AlertTriangle,
  Calendar,
  Shield,
  TrendingUp,
  Wrench,
  MapPin,
  Clock,
  Package,
  Phone,
  BookOpen,
  Trophy,
  Users,
  Award,
  Gift,
  Cloud,
  Smartphone,
  Lock,
  FileCheck,
  Navigation,
  CloudRain,
  Route,
  Fuel,
  CalendarDays,
  Mic,
  Watch,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const LearnMoreComponent = () => {
  const [activeSection, setActiveSection] = useState("features");
  const [isVisible, setIsVisible] = useState(true);
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const sections = {
    features: {
      title: "App Features & Capabilities",
      icon: <Zap className="w-6 h-6" />,
      items: [
        {
          icon: <Zap className="w-5 h-5" />,
          title: "Smart Service Scheduling",
          desc: "AI-powered recommendations based on your bike's usage",
        },
        {
          icon: <Camera className="w-5 h-5" />,
          title: "Photo Documentation",
          desc: "Before/after pictures of repairs and maintenance",
        },
        {
          icon: <DollarSign className="w-5 h-5" />,
          title: "Cost Tracking",
          desc: "Monitor expenses and budget for upcoming services",
        },
        {
          icon: <Bike className="w-5 h-5" />,
          title: "Multi-bike Management",
          desc: "Handle multiple motorcycles in one account",
        },
        {
          icon: <Wifi className="w-5 h-5" />,
          title: "Offline Mode",
          desc: "Access critical info even without internet",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Export Reports",
          desc: "Generate PDFs for insurance or resale purposes",
        },
      ],
    },
    analytics: {
      title: "Advanced Analytics & Insights",
      icon: <BarChart3 className="w-6 h-6" />,
      items: [
        {
          icon: <Gauge className="w-5 h-5" />,
          title: "Fuel Efficiency Tracking",
          desc: "Monitor MPG and riding patterns",
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Performance Metrics",
          desc: "Track acceleration, top speeds, and ride statistics",
        },
        {
          icon: <AlertTriangle className="w-5 h-5" />,
          title: "Predictive Maintenance",
          desc: "Get alerts before issues become expensive",
        },
        {
          icon: <Calendar className="w-5 h-5" />,
          title: "Seasonal Reminders",
          desc: "Winterization and storage preparation alerts",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: "Warranty Tracking",
          desc: "Never miss warranty deadlines",
        },
        {
          icon: <TrendingUp className="w-5 h-5" />,
          title: "Resale Value Calculator",
          desc: "Track your bike's market value over time",
        },
      ],
    },
    workshop: {
      title: "Workshop & Service Integration",
      icon: <Wrench className="w-6 h-6" />,
      items: [
        {
          icon: <MapPin className="w-5 h-5" />,
          title: "Verified Mechanics Network",
          desc: "Pre-screened, trusted service providers",
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Real-time Service Updates",
          desc: "Get notified about repair progress",
        },
        {
          icon: <FileCheck className="w-5 h-5" />,
          title: "Digital Service Records",
          desc: "Blockchain-verified maintenance history",
        },
        {
          icon: <Package className="w-5 h-5" />,
          title: "Parts Availability Checker",
          desc: "Find genuine parts in your area",
        },
        {
          icon: <Phone className="w-5 h-5" />,
          title: "Emergency Roadside Assistance",
          desc: "24/7 breakdown support integration",
        },
        {
          icon: <BookOpen className="w-5 h-5" />,
          title: "Service Booking",
          desc: "Book appointments directly through the app",
        },
      ],
    },
    community: {
      title: "Community & Gamification",
      icon: <Trophy className="w-6 h-6" />,
      items: [
        {
          icon: <Trophy className="w-5 h-5" />,
          title: "Maintenance Streaks",
          desc: "Rewards for consistent bike care",
        },
        {
          icon: <Users className="w-5 h-5" />,
          title: "Riding Challenges",
          desc: "Monthly distance and efficiency competitions",
        },
        {
          icon: <BookOpen className="w-5 h-5" />,
          title: "Knowledge Base",
          desc: "DIY guides and troubleshooting tips",
        },
        {
          icon: <Users className="w-5 h-5" />,
          title: "User Forums",
          desc: "Connect with other motorcycle enthusiasts",
        },
        {
          icon: <Award className="w-5 h-5" />,
          title: "Achievement Badges",
          desc: "Unlock rewards for proper maintenance",
        },
        {
          icon: <Gift className="w-5 h-5" />,
          title: "Referral Programs",
          desc: "Earn credits for bringing friends",
        },
      ],
    },
    security: {
      title: "Security & Data Features",
      icon: <Lock className="w-6 h-6" />,
      items: [
        {
          icon: <Cloud className="w-5 h-5" />,
          title: "Cloud Backup",
          desc: "Never lose your maintenance records",
        },
        {
          icon: <Smartphone className="w-5 h-5" />,
          title: "Multi-device Sync",
          desc: "Access from phone, tablet, or web",
        },
        {
          icon: <Lock className="w-5 h-5" />,
          title: "Privacy Controls",
          desc: "You own your data, not us",
        },
        {
          icon: <Shield className="w-5 h-5" />,
          title: "Insurance Integration",
          desc: "Direct claims and documentation sharing",
        },
        {
          icon: <Navigation className="w-5 h-5" />,
          title: "Theft Protection",
          desc: "GPS tracking and alert features",
        },
        {
          icon: <FileText className="w-5 h-5" />,
          title: "Secure Document Storage",
          desc: "Insurance papers, registration, etc.",
        },
      ],
    },
    integrations: {
      title: "Smart Integrations",
      icon: <Smartphone className="w-6 h-6" />,
      items: [
        {
          icon: <CloudRain className="w-5 h-5" />,
          title: "Weather-based Alerts",
          desc: "Riding condition warnings",
        },
        {
          icon: <Route className="w-5 h-5" />,
          title: "Route Optimization",
          desc: "Find the best roads and avoid traffic",
        },
        {
          icon: <Fuel className="w-5 h-5" />,
          title: "Fuel Price Tracker",
          desc: "Locate cheapest gas stations on your route",
        },
        {
          icon: <CalendarDays className="w-5 h-5" />,
          title: "Calendar Sync",
          desc: "Service reminders in your personal calendar",
        },
        {
          icon: <Mic className="w-5 h-5" />,
          title: "Voice Commands",
          desc: "Hands-free operation while riding",
        },
        {
          icon: <Watch className="w-5 h-5" />,
          title: "Smartwatch Compatibility",
          desc: "Quick stats on your wrist",
        },
      ],
    },
  };

  useEffect(() => {
    if (!isVisible) {
      router.push("/");
    }
  }, [isVisible, router]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-2">
            Discover Moto Pulse Features
          </h2>
          <p className="text-red-100">
            Everything you need for complete motorcycle maintenance and care
          </p>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 bg-gray-800 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    activeSection === key
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {section.icon}
                  <span className="font-medium text-sm">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                {sections[activeSection].icon}
                {sections[activeSection].title}
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections[activeSection].items.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            {!user && (
              <div className="mt-8 p-6 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl border border-red-600/30">
                <h4 className="text-xl font-bold text-white mb-2">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-300 mb-4">
                  Join thousands of riders who trust Moto Pulse for their
                  motorcycle maintenance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreComponent;
