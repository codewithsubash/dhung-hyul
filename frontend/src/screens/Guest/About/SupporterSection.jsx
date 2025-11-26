import React from 'react';

const SupportersSection = () => {
  const supporters = [
    { id: 1, name: 'Logoipsum Network', color: 'rainbow' },
    { id: 2, name: 'Logoipsum', color: 'blue' },
    { id: 3, name: 'Logoipsum', color: 'green' },
    { id: 4, name: 'Logoipsum', color: 'purple' },
    { id: 5, name: 'Logoipsum', color: 'pastel' },
    { id: 6, name: 'Logoipsum', color: 'multi' },
    { id: 7, name: 'Looo', color: 'dark' },
    { id: 8, name: 'LOGOIPSUM', color: 'navy' },
    { id: 9, name: 'Logoipsum', color: 'violet' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-teal-700 text-sm font-medium mb-2">Our Supporters</p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Together With These<br />Organisations, We Go Further
            </h1>
          </div>
          <button className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            All Supporters
          </button>
        </div>

        {/* Supporters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supporters.map((supporter) => (
            <div
              key={supporter.id}
              className="bg-white rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300 min-h-[180px]"
            >
              <div className="text-center">
                {supporter.id === 1 && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400"></div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Network</div>
                    </div>
                  </div>
                )}
                {supporter.id === 2 && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-500 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full h-1/2 bg-blue-500"></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">logoipsum</div>
                  </div>
                )}
                {supporter.id === 3 && (
                  <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold text-green-600">🐂</div>
                    <div className="text-2xl font-bold text-gray-900">logo<span className="text-green-600">ipsum</span></div>
                  </div>
                )}
                {supporter.id === 4 && (
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-10 h-1 bg-white"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
                  </div>
                )}
                {supporter.id === 5 && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-300"></div>
                      <div className="w-5 h-5 rounded-full bg-pink-300"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
                  </div>
                )}
                {supporter.id === 6 && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-12 h-12">
                      <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-red-400"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-yellow-400"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-green-400"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-400"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
                  </div>
                )}
                {supporter.id === 7 && (
                  <div className="text-5xl font-bold text-gray-900 tracking-tight">LOOO</div>
                )}
                {supporter.id === 8 && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 grid grid-cols-2 gap-0.5">
                      <div className="bg-blue-900 rounded-sm"></div>
                      <div className="bg-blue-900 rounded-sm"></div>
                      <div className="bg-blue-900 rounded-sm"></div>
                      <div className="bg-blue-900 rounded-sm"></div>
                    </div>
                    <div className="text-2xl font-bold text-blue-900 uppercase tracking-wide">Logoipsum</div>
                  </div>
                )}
                {supporter.id === 9 && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-600 rotate-0"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-600 rotate-45"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-600 rotate-90"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-1 bg-purple-600 -rotate-45"></div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">Logoipsum</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportersSection;