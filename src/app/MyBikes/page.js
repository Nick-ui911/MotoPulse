"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Plus, Bike } from "lucide-react";

export default function MyBikesClient() {
  const user = useSelector((store) => store.user.user);
  const [bikeList] = useState(user?.bikes || []);
  const router = useRouter();

  const handleAddBike = () => {
    router.push("/addbikes");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-xl shadow-lg shadow-red-900/50">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              My Bikes
            </h1>
          </div>
        </div>

        {/* Bikes Grid */}
        {bikeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-900 border-2 border-dashed border-red-800 rounded-2xl p-12 text-center max-w-md">
              <div className="bg-red-950/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No bikes added yet</h3>
              <p className="text-gray-500 mb-6">Start building your collection by adding your first bike</p>
           
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikeList.map((bike) => (
              <div
                key={bike.id}
                className="group relative bg-gradient-to-br from-gray-900 to-black border-2 border-red-900 rounded-2xl shadow-xl p-6 hover:border-red-600 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative z-10">
                  {/* Bike Icon Badge */}
                  <div className="absolute -top-3 -right-3 bg-red-600 rounded-full p-2 shadow-lg">
                    <Bike className="w-5 h-5 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text mb-4 pr-8">
                    {bike.brand} {bike.model}
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-semibold min-w-fit">Reg No:</span>
                      <span className="text-gray-300 font-mono bg-gray-800/50 px-3 py-1 rounded-lg border border-red-900/30">
                        {bike.registrationNo}
                      </span>
                    </div>
                    
                    {bike.purchaseDate && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-red-600">📅</span>
                        <span className="text-sm">
                          Purchased: {new Date(bike.purchaseDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Add Service Button */}
                  <button
                    onClick={() => router.push("/addservices")}
                    className="mt-4 w-full bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-400 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add Service Detail</span>
                  </button>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Bike Button - Fixed at Bottom Center */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={handleAddBike}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-2xl shadow-red-900/50 hover:shadow-red-800/60 hover:scale-110 flex items-center gap-3"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Bike</span>
          </button>
        </div>
      </div>
    </div>
  );
}