import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-[#F57931] border-dashed rounded-full animate-spin"></div>

        {/* Inner Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#F05A03] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
