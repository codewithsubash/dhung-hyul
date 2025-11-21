import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Dhung Hyul</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet consectetur adipm aperiam maxime autem. Voluptates inventore suscipit at? to our newsletter to receive the latest updates on features and releases.
            </p>

           
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Our Supporters</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Get Involved</a></li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 opacity-0 lg:opacity-100">
              Links
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Programmes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Our Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-teal-700">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>

            <div className="space-y-3 text-gray-600">
              <p>123 Placeholder Street, Auckland, New Zealand</p>
              <p><a href="mailto:contact@harbour.co.nz" className="hover:text-teal-700">contact@harbour.co.nz</a></p>
              <p><a href="tel:+6412345678" className="hover:text-teal-700">+64 123 456 78</a></p>

              <div className="flex gap-3 pt-2">
                <a className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200">
                  <Facebook className="w-5 h-5 text-teal-700" />
                </a>
                <a className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200">
                  <Instagram className="w-5 h-5 text-teal-700" />
                </a>
                <a className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200">
                  <Twitter className="w-5 h-5 text-teal-700" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <div className="flex flex-wrap gap-2">
            <span>© 2025 Dhung Hyul.</span>
            <span>Powered by Webflow</span>
            <span>Created by Trigger Digital</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-700">Privacy Policy</a>
            <a href="#" className="hover:text-teal-700">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
