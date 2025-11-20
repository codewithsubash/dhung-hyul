import React from "react";

const BlogFooter = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[420px] rounded-3xl  overflow-hidden mt-10 mb-10 mx-5 my-5">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
        alt="Footer Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20 text-white">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
          Together, we can  
          <br /> create change
        </h2>

        <p className="mt-5 max-w-2xl text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse 
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra 
          ornare, eros.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-medium">
            Get Involved
          </button>

          <button className="px-6 py-3 border border-white rounded-xl text-lg font-medium hover:bg-white hover:text-black transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFooter;
