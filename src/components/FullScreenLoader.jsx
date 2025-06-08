import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 border-opacity-60"></div>
        <p className="text-cyan-200 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
