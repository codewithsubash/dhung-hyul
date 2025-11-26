import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const SocialIcon = ({ type, url }) => {
  const iconProps = { size: 20, className: "text-gray-600 hover:text-teal-600 transition-colors" };
  
  const icons = {
    instagram: <Instagram {...iconProps} />,
    linkedin: <Linkedin {...iconProps} />,
    twitter: <Twitter {...iconProps} />,
    facebook: <Facebook {...iconProps} />
  };
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors">
      {icons[type]}
    </a>
  );
};

 const FounderCard = ({ image, name, role, description, socials }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="aspect-square md:aspect-auto overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-block">
            <span className="bg-teal-100 text-teal-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block">
              Founder
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{name}</h2>
          <p className="text-teal-600 text-xl font-medium mb-6">{role}</p>
          <p className="text-gray-600 text-base leading-relaxed mb-8">{description}</p>
          
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <SocialIcon key={index} type={social.type} url={social.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FounderCard;