"use client";
import { useEffect, useState } from "react";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!status.message) return;

    const timer = setTimeout(() => {
      setStatus({ type: "", message: "" });
      setShowTicketForm(false)
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [status]);

  const categories = [
    { id: "all", name: "All Topics", icon: BookOpen },
    { id: "account", name: "Account", icon: HelpCircle },
    { id: "billing", name: "Billing", icon: FileText },
    { id: "technical", name: "Technical", icon: MessageCircle },
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
    },
    {
      id: 2,
      category: "account",
      question: "Can I change my email address?",
      answer:
        "Yes, you can update your email address from the account settings page after verifying your new email.",
    },
    {
      id: 3,
      category: "account",
      question: "How do I delete my account?",
      answer:
        "You can request account deletion from the profile settings or contact our support team for assistance.",
    },
  
    {
      id: 4,
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, and PayPal. Payments are processed securely.",
    },
    {
      id: 5,
      category: "billing",
      question: "Is my payment information secure?",
      answer:
        "Yes, all transactions are encrypted and handled through trusted and secure payment gateways.",
    },
    {
      id: 6,
      category: "billing",
      question: "Can I get a refund?",
      answer:
        "Refund eligibility depends on our refund policy. Please contact support with your order details.",
    },
  
    {
      id: 7,
      category: "technical",
      question: "The app is slow. What should I do?",
      answer:
        "Try clearing your browser cache, checking your internet connection, or restarting the app.",
    },
    {
      id: 8,
      category: "technical",
      question: "I am not receiving emails. What can I do?",
      answer:
        "Please check your spam folder and ensure your email address is correct. If the issue persists, contact support.",
    },
    {
      id: 9,
      category: "technical",
      question: "Which browsers are supported?",
      answer:
        "We support the latest versions of Chrome, Firefox, Edge, and Safari for the best experience.",
    },
    {
      id: 10,
      category: "technical",
      question: "Why am I getting an unexpected error?",
      answer:
        "Unexpected errors may occur due to temporary issues. Please refresh the page or try again later.",
    },
  ];
  

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

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
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
          Support Center
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                activeCategory === id
                  ? "bg-red-600"
                  : "bg-gray-900 border border-red-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="border border-red-900 rounded-lg">
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full flex justify-between p-4 text-left"
              >
                <span>{faq.question}</span>
                {expandedFaq === faq.id ? <ChevronUp /> : <ChevronDown />}
              </button>

              {expandedFaq === faq.id && (
                <p className="p-4 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Ticket */}
        <div className="max-w-3xl mx-auto mt-12">
          {!showTicketForm ? (
            <div className="text-center">
              <Mail className="mx-auto text-red-500 w-10 h-10 mb-4" />
              <p className="mb-4">Still need help?</p>
              <button
                onClick={() => setShowTicketForm(true)}
                className="bg-red-600 px-6 py-3 rounded-lg"
              >
                Submit Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-red-900"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-red-900"
              />
              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-red-900"
              />
              <textarea
                name="message"
                placeholder="Describe your issue"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border border-red-900"
              />

              {status.message && (
                <div
                  className={`flex items-center gap-2 p-3 ${
                    status.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle />
                  ) : (
                    <AlertCircle />
                  )}
                  {status.message}
                </div>
              )}

              <button
                disabled={loading}
                className="bg-red-600 w-full py-3 rounded-lg"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
