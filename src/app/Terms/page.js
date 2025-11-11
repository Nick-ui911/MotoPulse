"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, AlertTriangle, FileText, Users } from 'lucide-react';

export default function TermsAndConditions() {
  const [expandedSections, setExpandedSections] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `By downloading, installing, or using the Moto Pulse application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our application. These terms constitute a legal agreement between you and Moto Pulse.`
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: <Shield className="w-5 h-5" />,
      content: `Moto Pulse provides motorcycle tracking, maintenance scheduling, route planning, and community features for motorcycle enthusiasts. Our services include GPS tracking, maintenance reminders, performance analytics, social features, and premium subscription options for enhanced functionality.`
    },
    {
      id: 'account',
      title: 'User Accounts and Registration',
      icon: <Users className="w-5 h-5" />,
      content: `You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate information during registration and keep your information updated.`
    },
    {
      id: 'usage',
      title: 'Acceptable Use Policy',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `You agree not to use Moto Pulse for any unlawful purposes, to respect other users' privacy and rights, to avoid uploading harmful or malicious content, to comply with all applicable traffic and safety laws, and to not attempt to hack or reverse engineer the application.`
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Collection',
      icon: <Shield className="w-5 h-5" />,
      content: `We collect location data, device information, usage analytics, and user-generated content as outlined in our Privacy Policy. Your data is encrypted and secured using industry-standard practices. We do not sell your personal information to third parties.`
    },
    {
      id: 'subscription',
      title: 'Subscription and Payment Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `Premium subscriptions are billed monthly or annually. All payments are processed securely through our payment partners. Subscriptions auto-renew unless cancelled. Refunds are available within 30 days of purchase for annual subscriptions.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Moto Pulse is not liable for accidents, injuries, or damages resulting from app usage. The app is provided "as-is" without warranties. Users are responsible for safe riding practices and compliance with traffic laws. Our liability is limited to the amount paid for premium services.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <FileText className="w-5 h-5" />,
      content: `Either party may terminate this agreement at any time. We reserve the right to suspend or terminate accounts for violations of these terms. Upon termination, your access to premium features will cease, but data export options are available for a limited time.`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative bg-black overflow-hidden py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-red-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">Terms & Conditions</h1>
                <p className="text-red-300 text-lg font-medium">Moto Pulse Application</p>
              </div>
            </div>
          </div>
          <div className="bg-red-900/20 border border-red-800/50 rounded-lg px-4 py-3 backdrop-blur-sm">
            <p className="text-red-200 text-sm flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Last Updated: September 25, 2025 • Effective Immediately
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-red-900">
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Welcome to Moto Pulse</h2>
          <p className="text-gray-300 leading-relaxed">
            These Terms and Conditions govern your use of the Moto Pulse mobile application and services. 
            Please read these terms carefully before using our application. By using Moto Pulse, you acknowledge 
            that you have read, understood, and agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-gray-900 rounded-lg border border-gray-700 hover:border-red-700 transition-all duration-300">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-red-400">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                </div>
                <div className="text-red-400">
                  {expandedSections[section.id] ? <ChevronDown /> : <ChevronRight />}
                </div>
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-gray-300 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-red-900 to-gray-900 rounded-lg p-6 mt-8 border border-red-800">
          <h3 className="text-xl font-semibold mb-4 text-red-300">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="font-medium text-red-400">Email Support:</p>
              <p>support@motopulse.com</p>
            </div>
            <div>
              <p className="font-medium text-red-400">Legal Inquiries:</p>
              <p>legal@motopulse.com</p>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="bg-gray-900 rounded-lg p-6 mt-8 border-2 border-red-800">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
            />
            <label htmlFor="acceptTerms" className="text-gray-300 leading-relaxed">
              I have read, understood, and agree to be bound by these Terms and Conditions. 
              I acknowledge that these terms may be updated from time to time and agree to 
              review them periodically.
            </label>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              disabled={!acceptedTerms}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                acceptedTerms
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-900/50'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {acceptedTerms ? 'Terms Accepted ✓' : 'Accept Terms to Continue'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Moto Pulse. All rights reserved.</p>
          <p className="mt-2">
            For questions about these terms, please contact us at{' '}
            <span className="text-red-400">legal@motopulse.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}