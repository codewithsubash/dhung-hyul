import React from "react";
import { motion } from "framer-motion";

const Marquee = ({ items = [] }) => {
  const duplicatedItems = [...items, ...items, ...items]; // Triple for smooth infinite loop

  return (
    <div className="overflow-hidden whitespace-nowrap w-full py-9 bg-transparent">
      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {duplicatedItems.map((item, index) => (
          <span key={index} className="text-5xl font-bold text-gray-700">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
