"use client";
import Link from 'next/link';
import React, { useState } from 'react'

const CookiesPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for basic website functionality',
      examples: 'Authentication, security, preferences',
      retention: 'Session or up to 1 year',
      canDisable: false
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how users interact with our service',
      examples: 'Page views, user behavior, performance metrics',
      retention: 'Up to 2 years',
      canDisable: true
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced features and personalization',
      examples: 'Language preferences, customized dashboard',
      retention: 'Up to 1 year',
      canDisable: true
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaigns',
      examples: 'Ad targeting, campaign effectiveness, social media integration',
      retention: 'Up to 2 years',
      canDisable: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(239 68 68) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-4">
            COOKIES POLICY
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn how Moto Pulse uses cookies to enhance your experience and protect your privacy
          </p>
          <div className="text-sm text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Summary
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We use cookies to make Moto Pulse work better for you. Essential cookies keep your account secure and the app running smoothly. 
            Optional cookies help us improve our service and show you relevant content. You can control your cookie preferences at any time 
            through your browser settings or our cookie consent banner.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
            </svg>
            Types of Cookies We Use
          </h2>
          
          <div className="space-y-4">
            {cookieTypes.map((cookie) => (
              <div key={cookie.id} className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => toggleSection(cookie.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300"
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-4 ${cookie.canDisable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{cookie.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{cookie.description}</p>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${expandedSection === cookie.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === cookie.id && (
                  <div className="px-6 pb-6 border-t border-gray-700/50">
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="text-sm font-medium text-red-400">Examples:</span>
                        <span className="text-gray-300 text-sm ml-2">{cookie.examples}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-red-400">Retention:</span>
                        <span className="text-gray-300 text-sm ml-2">{cookie.retention}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-red-400">Can be disabled:</span>
                        <span className={`text-sm ml-2 ${cookie.canDisable ? 'text-green-400' : 'text-red-400'}`}>
                          {cookie.canDisable ? 'Yes' : 'No (Required for functionality)'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-12">
          {[
            {
              title: "What Are Cookies?",
              content: "Cookies are small text files that are stored on your device when you visit our website or use our app. They help us recognize you, remember your preferences, and provide you with a better experience. Cookies cannot harm your device or files."
            },
            {
              title: "Why We Use Cookies",
              content: "We use cookies for several important purposes: to keep you logged in securely, to remember your maintenance preferences, to analyze how our app is used so we can improve it, to provide customer support, and to show you relevant content and features."
            },
            {
              title: "Third-Party Cookies",
              content: "Some cookies are set by third-party services we use, such as analytics providers (Google Analytics), payment processors, and social media platforms. These cookies are subject to the privacy policies of these third parties."
            },
            {
              title: "Your Cookie Choices",
              content: "You have several options to control cookies: accept all cookies for the best experience, accept only essential cookies, or modify settings through your browser. Note that disabling certain cookies may limit some features of Moto Pulse."
            }
          ].map((section, index) => (
            <div key={index} className="p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Cookie Management */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Manage Your Cookie Preferences
          </h2>
          <p className="text-gray-300 mb-6">
            You can change your cookie preferences at any time. Changes will take effect immediately, though some settings may require you to refresh the page or restart the app.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105">
              Cookie Settings
            </button>
            <button className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium rounded-lg transition-colors duration-300 border border-gray-600">
              Browser Settings Guide
            </button>
          </div>
        </div>

        {/* Browser Instructions */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6">Browser Cookie Settings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { browser: 'Chrome', steps: 'Settings > Privacy & Security > Cookies and other site data' },
              { browser: 'Firefox', steps: 'Settings > Privacy & Security > Cookies and Site Data' },
              { browser: 'Safari', steps: 'Preferences > Privacy > Manage Website Data' },
              { browser: 'Edge', steps: 'Settings > Cookies and site permissions > Cookies and site data' }
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-900/50 border border-gray-700/30">
                <h4 className="text-lg font-semibold text-red-400 mb-2">{item.browser}</h4>
                <p className="text-gray-300 text-sm">{item.steps}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-4">Questions About Our Cookie Policy?</h3>
          <p className="text-gray-300 mb-6">
            If you have any questions about how we use cookies or this policy, we&apos;re here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="mailto:privacy@motopulse.com" 
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              Email Us
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesPolicy