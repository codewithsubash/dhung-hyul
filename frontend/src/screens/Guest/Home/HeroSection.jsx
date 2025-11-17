import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HeroSection = () => {
  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1920&q=80",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center text-center">
      {/* Background slideshow */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[current]}
            alt="Nature background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Static text overlay */}
      <div className="relative z-10 px-6 text-white max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl"
        >
          Welcome to Dhung Hyul Aaviyan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
        >
          A dedicated social work group committed to preserving nature,
          empowering communities, and spreading compassion.
        </motion.p>

        <div className="flex justify-center gap-4 flex-wrap">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg"
          >
            Contact Us
          </motion.a>
          <motion.a
            href="/get-involved"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/90 hover:bg-white text-green-800 px-6 py-3 rounded-full font-medium transition-all shadow-lg"
          >
            Get Involved
          </motion.a>
        </div>
      </div>

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
};
