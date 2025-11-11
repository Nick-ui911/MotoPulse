"use client";
import Link from 'next/link';
import React, { useState } from 'react'

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const dataTypes = [
    {
      id: 'personal',
      name: 'Personal Information',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      data: ['Name, email address', 'Phone number', 'Profile photo', 'Account credentials'],
      purpose: 'Account creation, authentication, communication',
      retention: '2 years after account deletion'
    },
    {
      id: 'vehicle',
      name: 'Vehicle Information',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM7 12h10l3-3H6l1 3z',
      data: ['Make, model, year', 'VIN number', 'License plate', 'Engine specifications'],
      purpose: 'Maintenance tracking, service reminders, personalized recommendations',
      retention: 'Until vehicle is removed from account'
    },
    {
      id: 'maintenance',
      name: 'Maintenance Data',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      data: ['Service records', 'Maintenance schedules', 'Parts replaced', 'Mileage data'],
      purpose: 'Service tracking, predictive maintenance, analytics',
      retention: 'For the lifetime of your account'
    },
    {
      id: 'usage',
      name: 'Usage Analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      data: ['App usage patterns', 'Feature interactions', 'Device information', 'IP address'],
      purpose: 'App improvement, bug fixes, performance optimization',
      retention: '2 years from collection'
    }
  ]

  const userRights = [
    { title: 'Access Your Data', description: 'Request a copy of all personal data we have about you', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { title: 'Correct Information', description: 'Update or correct any inaccurate personal information', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { title: 'Delete Your Data', description: 'Request deletion of your personal data and account', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
    { title: 'Data Portability', description: 'Export your data in a commonly used format', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { title: 'Restrict Processing', description: 'Limit how we use your personal information', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636' },
    { title: 'Withdraw Consent', description: 'Revoke permission for data processing at any time', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-700 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(239 68 68) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 container mx-auto px-6 py-22 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-4">
            PRIVACY POLICY
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information when you use Moto Pulse.
          </p>
          <div className="text-sm text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Key Points Summary */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Privacy at a Glance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Data Security</h3>
              <p className="text-gray-300 text-sm">Industry-standard encryption and security measures protect your data</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Your Control</h3>
              <p className="text-gray-300 text-sm">Full control over your data with easy access, correction, and deletion rights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Transparency</h3>
              <p className="text-gray-300 text-sm">Clear explanations of what data we collect and exactly how it&apos;s used</p>
            </div>
          </div>
        </div>

        {/* Data We Collect */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Information We Collect
          </h2>
          
          <div className="space-y-4">
            {dataTypes.map((dataType) => (
              <div key={dataType.id} className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => toggleSection(dataType.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-lg mr-4 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dataType.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{dataType.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{dataType.purpose}</p>
                    </div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${expandedSection === dataType.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === dataType.id && (
                  <div className="px-6 pb-6 border-t border-gray-700/50">
                    <div className="mt-4 space-y-4">
                      <div>
                        <span className="text-sm font-medium text-red-400 block mb-2">Data Collected:</span>
                        <ul className="space-y-1">
                          {dataType.data.map((item, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-center">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-red-400">Retention Period:</span>
                        <span className="text-gray-300 text-sm ml-2">{dataType.retention}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Your Data */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Service Delivery', items: ['Account management', 'Maintenance reminders', 'Service recommendations', 'Customer support'] },
              { title: 'App Improvement', items: ['Bug fixes and updates', 'Feature development', 'Performance optimization', 'User experience research'] },
              { title: 'Communication', items: ['Service notifications', 'Important updates', 'Marketing (with consent)', 'Safety alerts'] },
              { title: 'Legal Compliance', items: ['Fraud prevention', 'Terms enforcement', 'Regulatory requirements', 'Safety and security'] }
            ].map((category, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-900/50 border border-gray-700/30">
                <h3 className="text-lg font-semibold text-red-400 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Your Privacy Rights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105 group">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-700/30 transition-colors duration-300">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={right.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{right.title}</h3>
                <p className="text-gray-400 text-sm">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Security */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Data Security & Protection
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-400">Technical Safeguards</h3>
                <ul className="space-y-2">
                  {['End-to-end encryption', 'Secure data centers', 'Regular security audits', 'Multi-factor authentication'].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-400">Organizational Measures</h3>
                <ul className="space-y-2">
                  {['Employee training', 'Access controls', 'Incident response plan', 'Privacy by design'].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="mb-12 p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Data Sharing & Third Parties
          </h2>
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">
              We do not sell your personal information. We only share data with trusted partners when necessary to provide our services:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Service Providers', description: 'Cloud hosting, payment processing, customer support' },
                { title: 'Analytics Partners', description: 'Anonymous usage statistics to improve our app' },
                { title: 'Legal Requirements', description: 'When required by law or to protect rights and safety' }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-900/50 border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Requests */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-sm border border-red-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Exercise Your Privacy Rights</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Ready to access, correct, or delete your data? Have questions about our privacy practices? We&apos;re here to help and respond within 30 days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="mailto:privacy@motopulse.com" 
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Privacy Team
            </Link>


          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy