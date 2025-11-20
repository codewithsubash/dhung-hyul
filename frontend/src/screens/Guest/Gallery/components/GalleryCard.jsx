import React from "react";
import { motion } from "framer-motion";

const GalleryCard = ({ image, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer max-w-sm"
    >
      {/* Image */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
