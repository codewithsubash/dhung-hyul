import React from 'react';
import { Users, Heart, Sprout, Droplets } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Our Mission</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering<br />Communities for Change
            </h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Who We Help</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Approach</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>
            </div>

            <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Join Our Mission
            </button>
          </div>

          {/* Right Image Card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-orange-100 to-orange-50 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
                alt="Community members"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image Card */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-green-50 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1000&fit=crop"
                alt="Community celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <p className="text-sm text-gray-600 mb-3">The Future</p>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              A World Where<br />Communities<br />Thrive Together
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Sprout className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Empowerment</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>

              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Droplets className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>
            </div>

            <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Get Involved
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}