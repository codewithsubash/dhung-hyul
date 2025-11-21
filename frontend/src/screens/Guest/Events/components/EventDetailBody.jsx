import React, { useState } from 'react';
import { Calendar, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const EventDetailBody = () => {
  const [email, setEmail] = useState('');

  const handleReserve = () => {
    if (email) {
      console.log('Reserved with email:', email);
      alert('Reservation submitted!');
      setEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Event Overview */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet. Eos facilis expedita vel voluptatem liberiosat ipsam quo laborum aperiam sit repellat omnis? Non nesciunt voluptas. <strong>Et consectetuer ad necessitatibus asperiores ea asperiatur suscipit qui</strong> deleritt quia quo perferendis aperatur sed explicabo quisquam. Ex similique quam <strong>Et voluptas ut aperiam interros</strong> in praesentium voluptas ab ipsum magni in nesciunt laborum ut reiciendis ducimus! Id sapiente dolor <em>Ut sequi ut delectus quis id ducimus dolore ea tempore obcoecoitr eos nulla rerum</em> sit suscipit nihil. Id dolorem sequaMoq omnis auf galisium saepe. Est iste sapienteUt dolor et maxime dolor? Rem deserunt quia aut delectus numquamUt omnis qui laudantium dolorem sit adipisci sunt voluptatem dolore.
            </p>
          </section>

          {/* Image with Caption */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800" 
              alt="Event participants"
              className="w-full rounded-2xl"
            />
            <p className="text-sm text-gray-500 mt-2 italic">Aut exercitationem dolorum ut adipisci</p>
          </div>

          {/* What to Expect */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What to Expect on the Day</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Et nesciunt praesentium eum voluptas atque Est tenetur ea magni exercitationem ut explicabo quia et facilis galisum ut laborum repudiandae. Ab consequuntur deserunt <em>Qui voluptatum et voluptatibus voluptatibus</em> est quasi error est suscipit aperiam et eveniet quia eos cupiditate molestias. Et necessitatibus reprehenderit et atque asperiamion asperiatur. Et excepturi saepeUt reprehenderit in soluta delectus qui pariatur rerum et provident reiciendis eos blanditiis rerum et architecto numquam? Ut aliquid undeA dignissimos ab ex esse incidunt at omnis consequatur et quisquam illum At placeat porro.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Est minus architecto. Non doloribus autem non laboriosam aliquam quo blanditiis expedita At tenetur facere. Et dolore esse et omnis dolorem. Qui beatae nulla et fugit nisi. Nam tempora dolore sit porro voluptatum. Quo deleritt blanditiis est minima illum.
            </p>
          </section>

          {/* Why This Event Matters */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Event Matters</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Qui beatae quasiid neque et praesentium dolor 33 consequatur culpa ut excepturi laborum. Aut consequatur similique et enim distinctioqui eveniet. Ea blanditiis quia aut dolorem facilison repellendus sed deleniti illum eos laborum voluptates. <strong>Eos beatae amet Et quis id corrupti nesciunt a quidem accusamus</strong>. Eos incidunt amet et natus dolor Et voluptas rem veritatis dolore est voluptate iure non voluptas quae.
            </p>
            
            {/* Quote Block */}
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 my-6 rounded-r-lg">
              <p className="text-gray-700 italic">
                Aut molestias voluptatem qui aperiam ullam vel galisum corrupti aut repellendus quisquam qui illo rerum sit consequatur blanditiis.
              </p>
            </div>
          </section>

          {/* Registration Details */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Details</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Eos possimus placeat qui optio quod <em>Cum minus ut itaque ratione ea aperiam veniam et quia quas</em> et velit repellat. Et libero necessitatibusEt laudantium ut excepturi ipsam ex esse accusantium. Aut asperiores quia aut adipisci eveniet Vel ipsam vel consequatur saepe hic sint sapiente <strong>At necessitatibus ducimus et autem nesciunt?</strong> Vel dicta laudantiumUt eligendi ut odit dolorem eos recusandae eaque et quia laudantium sed aperiam consequatur et minus nemo. Qui maxime repellendus et iste consequunturNam sequi cum fugit quae ab eligendi accusamus ut voluptatem accusantium. Id aperiam delectusSit veniam et sequi minus. Est suscipit voluptatem nam dolorem culpaea galisum.
            </p>

            {/* Numbered List */}
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
              <li>Eum debitis quae et aperatur corporis?</li>
              <li>Hic nulla itaque eos minima ipsam qui sint neque.</li>
              <li>Hic numquam tempora hic autem tempore.</li>
            </ol>

            {/* Bullet List */}
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Ad blanditiis odit et enim cupiditate.</li>
              <li>Ut corporis maiores non iste doloremque aut repellat esse ex cumque rerum.</li>
            </ul>
          </section>

          {/* Accessibility & Venue Info */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility & Venue Info</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Harbour</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Voluptatem Vel ullam voluptate qui deleniti quis aut quis quaerat. Quo animi minima qui facilis vel tempore deleniti. Eos officiis officiael voluptas et tenetur dolor. Quo laborum Qui ullam et quod aperiam et illum asperiatur. Qui nesciunt excepturi sed omnis magniameos dignissimos. Et enim natus ut ullam quis <strong>Rem odit vel eligendi dolorem</strong> ut praesentium velit a dolorum atque et quia asperiores! Ut nulla ratione non dolores esqueAut iste est expedita in loam doloribus?
            </p>
          </section>
        </div>

        {/* Sidebar - Right Column (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Event Details Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date:</p>
                    <p className="text-gray-900 font-medium">September 15, 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location:</p>
                    <p className="text-gray-900 font-medium">123 Example Street</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reserve a Spot Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reserve a Spot</h3>
              
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={handleReserve}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Reserve
                </button>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
              
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailBody;