export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Brand + Newsletter */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-green-700"></div>
            <span className="text-xl font-semibold text-gray-800">
              Shung Hyul
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter to receive the latest updates on features and releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 rounded-lg bg-[#EDF5F2] focus:outline-none"
            />
            <button className="bg-green-800 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-1">
          <h3 className="font-semibold text-gray-800 mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/" className="hover:text-green-700">Home</a></li>
            <li><a href="/about" className="hover:text-green-700">About</a></li>
            <li><a href="/gallery" className="hover:text-green-700">Gallery</a></li>
            <li><a href="/event" className="hover:text-green-700">Event</a></li>
            <li><a href="/get-involved" className="hover:text-green-700">Get Involved</a></li>
          </ul>
        </div>

        {/* Programs / Info */}
        <div className="md:col-span-1">
          <h3 className="font-semibold text-gray-800 mb-3">Programs</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/our-supporters" className="hover:text-green-700">Our Supporters</a></li>
            <li><a href="/our-blog" className="hover:text-green-700">Our Blog</a></li>
            <li><a href="/contact" className="hover:text-green-700">Contact Us</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Connect With Us</h3>
          <p className="text-gray-600 mb-2">
            123 Placeholder Street, Kathmandu, Nepal
          </p>
          <p className="text-gray-600 mb-1">contact@shunghyul.org</p>
          <p className="text-gray-600 mb-4">+977 9801234567</p>

          <div className="flex gap-3">
            <a href="#" className="bg-[#EDF5F2] p-2 rounded-lg hover:bg-green-100 transition">
              <i className="fab fa-facebook-f text-green-800"></i>
            </a>
            <a href="#" className="bg-[#EDF5F2] p-2 rounded-lg hover:bg-green-100 transition">
              <i className="fab fa-instagram text-green-800"></i>
            </a>
            <a href="#" className="bg-[#EDF5F2] p-2 rounded-lg hover:bg-green-100 transition">
              <i className="fab fa-x-twitter text-green-800"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t text-gray-600 text-sm py-4 px-6 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Shung Hyul.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="/privacy" className="hover:text-green-700">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-green-700">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
