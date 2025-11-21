import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestEventCard = ({ 
  image,
  category,
  date,
  title,
  description,
  link = "#"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (link && link !== "#") {
      window.open(link, '_blank');
    }
  };

  return (
    <div 
      className="w-full max-w-lg cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div 
        className="relative overflow-hidden rounded-3xl mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-72 overflow-hidden rounded-3xl">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        </div>
        
        {/* Arrow — Navigate to Event Detail */}
        <div 
          className="absolute bottom-4 left-4"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            navigate("event-details"); // Go to event detail page
          }}
        >
          <div
            className="bg-green-500 rounded-full p-3 shadow-lg transition-all duration-300 ease-out cursor-pointer"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translate(0, 0) scale(1)' : 'translate(-20px, 20px) scale(0.5)'
            }}
          >
            <ArrowUpRight className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Category and Date */}
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-gray-500 text-sm">
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestEventCard;
