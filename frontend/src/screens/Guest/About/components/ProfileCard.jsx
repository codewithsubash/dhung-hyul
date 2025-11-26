import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const SocialIcon = ({ type, url }) => {
  const iconProps = { size: 18, className: "text-gray-600 hover:text-teal-600 transition-colors" };
  
  const icons = {
    instagram: <Instagram {...iconProps} />,
    linkedin: <Linkedin {...iconProps} />,
    twitter: <Twitter {...iconProps} />,
    facebook: <Facebook {...iconProps} />
  };
  
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors">
      {icons[type]}
    </a>
  );
};

 const ProfileCard = ({ image, name, role, description, socials }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-teal-600 font-medium mb-4">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
        
        <div className="flex gap-2">
          {socials.map((social, index) => (
            <SocialIcon key={index} type={social.type} url={social.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;