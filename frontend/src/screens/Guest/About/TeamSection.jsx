import React from 'react';
import  FounderCard from './components/FounderCard';
import ProfileCard  from './components/ProfileCard';


const TeamSection = ({ title, subtitle, founder, members }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-teal-600 font-medium mb-3">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
        </div>
        
        {/* Founder Card (if provided) */}
        {founder && <FounderCard {...founder} />}
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <ProfileCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection; // ← Changed from export const