"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/apiUrl";
import Spinner from "@/app/components/Spinner";

export default function BikeServices() {
  const { bikeId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchServices() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/bikeservices/${bikeId}`, {
          signal: controller.signal,
        });
        setServices(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error:", err);
          setError("Failed to load services. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchServices();

    return () => controller.abort();
  }, [bikeId]);

  if (loading)
    return (
    <Spinner/>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center bg-zinc-900 p-8 rounded-3xl border-2 border-red-500/50 shadow-2xl shadow-red-500/20">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-400 text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  if (services.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center bg-zinc-900 p-8 rounded-3xl border-2 border-zinc-700">
          <svg className="w-16 h-16 mx-auto mb-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-lg">No service history found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-18">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 px-6 py-2 rounded-full shadow-lg shadow-red-500/50">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-white font-bold text-sm uppercase tracking-wider">Service Records</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 mb-4 tracking-tight">
            Service History
          </h1>
          <p className="text-gray-400 text-lg">Complete maintenance records for your bike</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-3xl border-2 border-zinc-800 hover:border-red-500/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent p-6 border-b border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                        {service.bike.brand} {service.bike.model}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {service.bike.registrationNo}
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full">
                      <span className="text-red-400 font-semibold text-xs uppercase tracking-wide">{service.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5">
                {/* Service Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Date</span>
                    </div>
                    <p className="text-white font-semibold">{new Date(service.serviceDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Odometer</span>
                    </div>
                    <p className="text-white font-semibold">{service.odometerReading} km</p>
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Remarks</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{service.remarks}</p>
                </div>

                {/* Service Items */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Service Items
                    </h3>
                    <span className="text-xs text-gray-500 bg-zinc-800 px-3 py-1 rounded-full">
                      {service.items.length} items
                    </span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {service.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-black/40 border border-zinc-800 rounded-lg p-3 hover:border-red-500/30 transition-all duration-300 group/item"
                      >
                        <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">{item.itemName}</span>
                        <span className="text-red-400 font-bold text-sm bg-red-500/10 px-3 py-1 rounded-full">
                          ₹{item.cost.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Center */}
                <div className="bg-gradient-to-br from-zinc-800/50 to-black/50 rounded-xl p-5 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Service Center</span>
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{service.serviceCenter.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-400 flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {service.serviceCenter.address}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {service.serviceCenter.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}</style>
    </div>
  );
}