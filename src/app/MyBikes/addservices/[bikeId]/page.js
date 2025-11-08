"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  Plus,
  Trash2,
  Wrench,
  CheckCircle,
  X,
} from "lucide-react";
import { BASE_URL } from "@/constants/apiUrl";
import { useParams, useSearchParams } from "next/navigation";

const BikeServiceForm = () => {
  // individual states
  const { bikeId } = useParams();
  const searchParams = useSearchParams();
  const bikeBrand = searchParams.get("bikeBrand");
  const bikeModel = searchParams.get("bikeModel");
  const [serviceDate, setServiceDate] = useState("");
  const [odometerReading, setOdometerReading] = useState("");
  const [remarks, setRemarks] = useState("");

  const [centerName, setCenterName] = useState("");
  const [centerAddress, setCenterAddress] = useState("");
  const [centerPhone, setCenterPhone] = useState("");

  const [items, setItems] = useState([{ itemName: "", cost: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { itemName: "", cost: "" }]);
  const removeItem = (index) =>
    items.length > 1 && setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        bikeId,
        serviceDate,
        odometerReading: Number(odometerReading) || null,
        remarks,
        serviceCenter: {
          name: centerName,
          address: centerAddress,
          phone: centerPhone,
        },
        items: items
          .filter((i) => i.itemName)
          .map((i) => ({ itemName: i.itemName, cost: Number(i.cost) || 0 })),
      };

      await axios.post(`${BASE_URL}/addservicedetails`, payload);
      setSuccess("Service record created successfully!");

      // reset all states
      setServiceDate("");
      setOdometerReading("");
      setRemarks("");
      setCenterName("");
      setCenterAddress("");
      setCenterPhone("");
      setItems([{ itemName: "", cost: "" }]);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create service record");
    } finally {
      setLoading(false);
    }
  };

  const totalCost = items.reduce(
    (sum, item) => sum + (parseFloat(item.cost) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-black px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-12">
      {/* Fixed Alert Notifications */}
      <div className="fixed top-20 right-4 z-50 max-w-md w-full space-y-2 sm:top-24 sm:right-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-900/95 backdrop-blur-sm border border-red-500 rounded-lg p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-red-100 text-sm font-medium break-words">
                  {error}
                </p>
              </div>
              <button
                onClick={() => setError("")}
                className="flex-shrink-0 text-red-400 hover:text-red-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-green-900/95 backdrop-blur-sm border border-green-500 rounded-lg p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-green-100 text-sm font-medium break-words">
                  {success}
                </p>
              </div>
              <button
                onClick={() => setSuccess("")}
                className="flex-shrink-0 text-green-400 hover:text-green-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-800 p-6">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">
                New Service Record – {bikeBrand} {bikeModel}
              </h1>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-red-400 text-sm font-semibold mb-2">
                  Service Date *
                </label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                />
              </div>

              <div>
                <label className="block text-red-400 text-sm font-semibold mb-2">
                  Odometer Reading (km)
                </label>
                <input
                  type="number"
                  value={odometerReading}
                  onChange={(e) => setOdometerReading(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                  placeholder="Enter reading"
                />
              </div>
            </div>

            {/* Service Center */}
            <div className="border border-red-900/30 rounded-lg p-4 bg-zinc-900/50">
              <h3 className="text-red-400 font-semibold mb-4 text-lg">
                Service Center Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-red-400 text-sm font-semibold mb-2">
                    Center Name *
                  </label>
                  <input
                    type="text"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                    placeholder="Center name"
                  />
                </div>

                <div>
                  <label className="block text-red-400 text-sm font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={centerAddress}
                    onChange={(e) => setCenterAddress(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                    placeholder="Service center address"
                  />
                </div>

                <div>
                  <label className="block text-red-400 text-sm font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={centerPhone}
                    onChange={(e) => setCenterPhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                    placeholder="Contact number"
                  />
                </div>
              </div>
            </div>

            {/* Service Items */}
            <div className="border border-red-900/30 rounded-lg p-4 bg-zinc-900/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-red-400 font-semibold text-lg">
                  Service Items
                </h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) =>
                        handleItemChange(index, "itemName", e.target.value)
                      }
                      placeholder="Item name"
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={item.cost}
                        onChange={(e) =>
                          handleItemChange(index, "cost", e.target.value)
                        }
                        placeholder="Cost"
                        step="0.01"
                        className="flex-1 sm:w-32 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="p-2.5 bg-zinc-800 hover:bg-red-900/30 text-red-500 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-700 flex justify-between items-center">
                <span className="text-red-400 font-semibold">Total Cost:</span>
                <span className="text-2xl font-bold text-white">
                  ₹{totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-red-400 text-sm font-semibold mb-2">
                Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows="4"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition resize-none"
                placeholder="Additional notes about the service..."
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50"
            >
              {loading ? "Creating Service Record..." : "Create Service Record"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeServiceForm;
