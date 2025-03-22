import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 bg-opacity-5 z-50">
      <div className="flex items-center justify-center">
        <span className="loading loading-bars loading-xl text-black"></span>
      </div>
    </div>
  );
};

export default Loading;
