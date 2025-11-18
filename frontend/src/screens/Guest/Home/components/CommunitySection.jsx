export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-teal-700 text-md font-normal mb-2">Who we are</p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Empowering
              <br />
              Communities for Change
            </h1>
          </div>
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            More About us
          </button>
        </div>

        {/* Mission and Vision Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Our Mission */}
          <div className="bg-gray-200 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-300 rounded-full opacity-30 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-300 rounded-full opacity-20 -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Duis cursus, mi quis viverra ornare, eros dolor interdum nulla,
                ut commodo diam libero vitae erat. Aenean faucibus nibh et justo
                cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                tristique posuere. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Suspendisse varius enim in eros elementum
                tristique.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className="bg-teal-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-900 rounded-full opacity-30 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-700 rounded-full opacity-20 -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-teal-50 leading-relaxed">
                Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
                Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Suspendisse varius enim in
                eros elementum tristique. Duis cursus, mi quis viverra ornare,
                eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-6 ">
          {/* Image with Stats Overlay */}
          <div className="relative rounded-3xl overflow-hidden h-full">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
              alt="Community gathering"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-teal-800 rounded-2xl p-8 flex items-center gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-[2px] h-20 bg-teal-600 rounded-full"></div>
                  <div>
                    <div className="text-4xl font-semibold text-white mb-1">
                      24
                    </div>
                    <div className="text-teal-100 text-sm">Programmes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[2px] h-20 bg-teal-600 rounded-full"></div>
                  <div>
                    <div className="text-4xl font-semibold text-white mb-1">
                      120+
                    </div>
                    <div className="text-teal-100 text-sm">
                      Community Events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why support us */}
          <div className="bg-gray-200 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why support us?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <button className="border-2 border-green-700 hover:border-green-800 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Become a Supporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
