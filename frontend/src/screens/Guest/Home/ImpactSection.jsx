import React from 'react';

export default function ImpactSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-800 text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <div>
            <p className="text-emerald-300 text-sm md:text-base mb-4 tracking-wide">Our Impact</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Together We Make a<br />
              Difference in Our Community
            </h1>
          </div>
          <button className="mt-6 md:mt-0 bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
            Make an Impact
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Stat 1 */}
          <div className="  p-8 border-l-2 border-white/10">
            <p className="text-5xl md:text-6xl font-bold text-emerald-300 mb-4">50,000+</p>
            <p className="text-xl text-gray-300">People Reached</p>
          </div>

          {/* Stat 2 */}
          <div className="  p-8  border-l-2 border-white/10">
            <p className="text-5xl md:text-6xl font-bold text-emerald-300 mb-4">120+</p>
            <p className="text-xl text-gray-300">Community Projects</p>
          </div>

          {/* Stat 3 */}
          <div className="  p-8 border-l-2 border-white/10">
            <p className="text-5xl md:text-6xl font-bold text-emerald-300 mb-4">$2M</p>
            <p className="text-xl text-gray-300">Funds Raised</p>
          </div>
        </div>

        {/* Description Text */}
        <div className="max-w-3xl">
          <p className="text-gray-300 text-lg leading-relaxed">
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero 
            vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem 
            vitae risus tristique posuere.
          </p>
        </div>
      </div>
    </div>
  );
}