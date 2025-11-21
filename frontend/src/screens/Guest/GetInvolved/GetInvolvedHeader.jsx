import React from "react";

const GetInvolvedHeader = () => {
  return (
    <div
      className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1593642532871-8b12e02d091c"
        alt="Blog Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Blog</h1>
        <p className="max-w-3xl text-lg md:text-xl leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare.
        </p>
      </div>
    </div>
  );
};

export default GetInvolvedHeader;
