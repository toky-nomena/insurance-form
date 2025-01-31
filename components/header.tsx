import React from "react";
export const Header = () => {
  return (
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center font-bold text-xl">
          <h1>Header title</h1>
        </div>
        <div className="flex items-center">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-gray-700 font-medium">(555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};
