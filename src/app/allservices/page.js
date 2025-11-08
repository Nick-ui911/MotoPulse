"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Wrench, Calendar, MapPin, Gauge, FileText, IndianRupee } from "lucide-react";
import { BASE_URL } from "@/constants/apiUrl";
import Spinner from "../components/Spinner";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
  
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(BASE_URL + "/bikeservices", {
          signal: controller.signal,
        });
        setServices(data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error fetching services:", error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
  
    fetchServices();
    return () => controller.abort();
  }, []);
  
  if (loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white  px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Wrench className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Service History
            </h1>
          </div>
          <p className="text-gray-400 ml-11">Track all your bike maintenance and service records</p>
        </div>

        {services.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-12 text-center">
            <Wrench className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No service records found</p>
            <p className="text-gray-600 text-sm mt-2">Your service history will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {service.bike.brand} {service.bike.model}
                      </h2>
                      <p className="text-red-100 text-sm font-medium">
                        {service.bike.registrationNo}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <p className="text-xs text-red-200 uppercase tracking-wider">Service Date</p>
                        <p className="text-white font-semibold">
                          {new Date(service.serviceDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">
                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Service Center</p>
                        <p className="text-white font-medium">{service.serviceCenter?.name || "N/A"}</p>
                        <p className="text-gray-400 text-sm">{service.serviceCenter?.address || ""}</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-start space-x-3">
                      <Gauge className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Odometer</p>
                        <p className="text-white font-medium text-lg">{service.odometerReading.toLocaleString()} km</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                        <p className="text-white font-medium">
                          {service.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remarks */}
                  {service.remarks && (
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Remarks</p>
                          <p className="text-gray-300">{service.remarks}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Items */}
                  {service.items && service.items.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                        <Wrench className="w-4 h-4 mr-2 text-red-500" />
                        Service Items
                      </h3>
                      <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                        <div className="divide-y divide-gray-700">
                          {service.items.map((item, index) => (
                            <div
                              key={item.id || index}
                              className="p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                <span className="text-gray-200 font-medium">{item.itemName}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-green-500 font-semibold">
                                <IndianRupee className="w-4 h-4" />
                                <span>{item.cost.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Total */}
                        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border-t border-red-800/30 p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-semibold uppercase tracking-wider text-sm">Total Cost</span>
                            <div className="flex items-center space-x-1 text-red-400 font-bold text-xl">
                              <IndianRupee className="w-5 h-5" />
                              <span>
                                {service.items.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}