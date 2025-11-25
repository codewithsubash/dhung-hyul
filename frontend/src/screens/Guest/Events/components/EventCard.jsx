import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ 
  image,
  category,
  date,
  title,
  description,
  link = "event-details",
  size = "large"
}) => {
  const [isHovered, setIsHovered] = useState(false);

const heightClass =
  size === "large"
    ? "h-[600px]"
    : size === "medium"
    ? "h-[400px]"
    : "h-[280px]"; // small


  return (
    <div 
      className={`relative ${heightClass} rounded-3xl overflow-hidden cursor-pointer group shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url(${image})`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)'
        }}
      />

      {/* Hover Overlay (better smooth dark layer) */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isHovered ? "bg-black/50" : "bg-black/30"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
        {/* Top Section */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
            {category}
          </span>
          <span className="text-white text-sm font-medium">{date}</span>
        </div>

        {/* Bottom Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {title}
          </h3>

          {description && (
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
              {description}
            </p>
          )}
          <Link to="event-details">
          <button 
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-medium border border-white/40 hover:bg-white/30 transition-all duration-300"
          >
            Event Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
