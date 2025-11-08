import React from "react";

const Spinner = () => {
  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 text-lg">Loading services...</p>
      </div>
    </div>
  );
};

export default Spinner;
