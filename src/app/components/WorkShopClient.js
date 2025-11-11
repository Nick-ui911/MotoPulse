"use client";
import React from "react";
import { useRouter } from "next/navigation";

const WorkShopClient = ({ centers = [] }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title & Add Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                All Service Centers
              </span>
            </h1>
            <div className="h-0.5 w-24 bg-gradient-to-r from-red-600 to-transparent"></div>
          </div>
          
          <button
            onClick={() => router.push('/addServiceCenter')}
            className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Add Center</span>
            <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>

        {/* Centers List */}
        {centers.length === 0 ? (
          <div className="text-center py-16 bg-black/60 border-2 border-red-900/50 rounded-xl backdrop-blur-sm">
            <div className="text-7xl mb-6 opacity-50">🔧</div>
            <p className="text-gray-400 text-xl font-medium">No service centers available</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {centers.map((center) => (
              <div
                key={center.id}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-black via-red-950/20 to-black border-2 border-red-700/40 hover:border-red-500/80 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent opacity-70"></div>
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {center.name}
                  </h2>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-0.5 text-lg">📍</span>
                      <p className="text-gray-300 text-sm leading-relaxed flex-1">
                        {center.address}
                      </p>
                    </div>
                    
                    {center.phone && (
                      <div className="flex items-center gap-3">
                        <span className="text-red-500 text-lg">📞</span>
                        <a 
                          href={`tel:${center.phone}`}
                          className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors"
                        >
                          {center.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Bottom glow effect */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkShopClient;