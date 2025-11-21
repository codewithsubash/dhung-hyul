import React from 'react';

const EventDetailHeader = ({ 
  category = "Mentorship",
  title = "Nurturing the Next Generation Through Long-Term Youth Mentorship",
  backgroundImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200"
}) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
            {category}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default EventDetailHeader;