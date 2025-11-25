import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Handshake, Users } from "lucide-react";

const slides = [
  {
    id: "donate",
    title: "Make a Donation",
    subtitle: "Your small act can change someone's world.",
    bg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    icon: <Heart size={26} />,
    button: "Donate Now",
  },
  {
    id: "volunteer",
    title: "Become a Volunteer",
    subtitle: "Join hands with us and make a real impact.",
    bg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    icon: <Users size={26} />,
    button: "Join the Mission",
  },
  {
    id: "sponsor",
    title: "Sponsor a Cause",
    subtitle: "Support long-term projects that uplift communities.",
    bg: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
    icon: <Handshake size={26} />,
    button: "Sponsor Us",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full bg-white text-white py-16 px-4">
      {/* Section Header */}
      <div className="mb-12 ml-0 md:ml-12">
        <p className="text-teal-600 font-medium mb-3">Featured Events</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Key Upcoming Events <br /> You Won't Want to Miss
        </h2>
      </div>

      {/* Slides Container */}
      <div className="flex w-full h-[80vh] min-h-[500px] space-x-4 items-center justify-center">
        {slides.map((slide, index) => {
          const isActive = active === index;
          return (
            <motion.div
              key={slide.id}
              onClick={() => setActive(index)}
              className="relative h-full cursor-pointer overflow-hidden rounded-2xl"
              animate={{ width: isActive ? "80%" : "5%" }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/10" />

              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rotate-90 text-xl font-semibold text-gray-200 tracking-wide whitespace-nowrap">
                    {slide.id.toUpperCase()}
                  </span>
                </div>
              )}

              {isActive && (
                <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-xl">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg mb-6 text-gray-200 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <button className="bg-green-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 w-fit transition-colors">
                    {slide.button}
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
