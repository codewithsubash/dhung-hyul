import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateFormatter";

const LatestEventCard = ({ eventList }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/event/${eventList?.slug}/detail`}>
      <div className="w-full max-w-lg cursor-pointer">
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-3xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="h-72 overflow-hidden rounded-3xl">
            <img
              src={eventList?.image?.secureUrl}
              alt={eventList?.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </div>

          {/* Completed Badge */}
          {eventList?.status === "Completed" && (
            <div className="absolute top-4 right-4 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Completed
            </div>
          )}

          {/* Arrow — Navigate to Event Detail */}
          <div className="absolute bottom-4 left-4">
            <div
              className="absolute bottom-4 left-4 bg-green-600 rounded-full p-3 shadow-lg transition-all duration-300 ease-out"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered
                  ? "translate(0,0) scale(1)"
                  : "translate(-20px,20px) scale(0.5)",
              }}
            >
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Category and Date */}
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block px-3 py-1 border border-green-700 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {eventList?.category?.name}
            </span>
            <span className="text-gray-500 text-xs font-medium">
              {formatDate(eventList?.createdAt)}
            </span>
          </div>
          {/* Title */}
          <h3 className="text-xl font-medium text-gray-900 leading-tight mb-2">
            {eventList?.title}
          </h3>
          {/* Description */}
          {/* {description && (
          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
        )} */}
        </div>
      </div>
    </Link>
  );
};

export default LatestEventCard;
