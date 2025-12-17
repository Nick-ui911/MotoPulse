"use client";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!status.message) return;

    const timer = setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [status]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post(BASE_URL + "/contact", formData);
      const data = response.data;

      if (response.status === 200 && data.success) {
        setStatus({
          type: "success",
          message: data.message,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false); // ✅ always stop loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black  to-black">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-red-900 hover:border-red-600 transition-all hover:shadow-red-900/50">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">
                Email Us
              </h3>
              <p className="text-gray-300">baghelnikhil911@gmail.com</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-red-900 hover:border-red-600 transition-all hover:shadow-red-900/50">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">
                Call Us
              </h3>
              <p className="text-gray-300">+919755716505</p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-red-900 hover:border-red-600 transition-all hover:shadow-red-900/50">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-red-500 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-300">Vijay Nagar, Indore 452010</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 border border-red-900">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-red-500 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black border border-red-900 text-gray-100 focus:ring-2 focus:ring-red-600 focus:border-transparent transition placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-red-500 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black border border-red-900 text-gray-100 focus:ring-2 focus:ring-red-600 focus:border-transparent transition placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-red-500 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-red-900 text-gray-100 focus:ring-2 focus:ring-red-600 focus:border-transparent transition placeholder-gray-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-red-500 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-red-900 text-gray-100 focus:ring-2 focus:ring-red-600 focus:border-transparent transition resize-none placeholder-gray-500"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-3 border ${
                      status.type === "success"
                        ? "bg-green-950 text-green-400 border-green-800"
                        : "bg-red-950 text-red-400 border-red-800"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">
                      {status.message}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg shadow-red-900/50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
