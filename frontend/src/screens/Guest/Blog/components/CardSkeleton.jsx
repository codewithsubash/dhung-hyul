import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>

      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* Small line */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Description lines */}
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
