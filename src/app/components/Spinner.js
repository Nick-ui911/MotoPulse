import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full" />
    </div>
  );
};

export default Spinner;
