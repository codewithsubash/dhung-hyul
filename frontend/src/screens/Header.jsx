import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down — hide header
        setShowHeader(false);
      } else {
        // Scrolling up — show header
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#EDF5F2]/90 backdrop-blur-sm text-gray-800 px-6 py-3 flex items-center justify-between rounded-full shadow-sm mx-2 mt-2 transition-transform duration-500 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-green-700"></div>
        <span className="text-xl font-semibold">Dhung Hyul</span>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium">
        <a href="/" className="hover:text-green-700 transition-colors">
          Home
        </a>
        <a href="/about" className="hover:text-green-700 transition-colors">
          About
        </a>
        <a href="/gallery" className="hover:text-green-700 transition-colors">
          Gallery
        </a>
        <a href="/event" className="hover:text-green-700 transition-colors">
          Event
        </a>
        <a href="/contact" className="hover:text-green-700 transition-colors">
          Contact
        </a>
        <a
          href="/get-involved"
          className="hover:text-green-700 transition-colors"
        >
          Get Involved
        </a>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="bg-green-800 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
          >
            User
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow rounded-lg p-2 w-32 animate-fadeIn">
              <a
                href="/profile"
                className="block px-2 py-1 rounded hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/logout"
                className="block px-2 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col gap-3 md:hidden animate-slideDown">
          <a href="/" className="hover:text-green-700">
            Home
          </a>
          <a href="/about" className="hover:text-green-700">
            About
          </a>
          <a href="/gallery" className="hover:text-green-700">
            Gallery
          </a>
          <a href="/event" className="hover:text-green-700">
            Event
          </a>
          <a href="/contact" className="hover:text-green-700">
            Contact
          </a>
          <a href="/get-involved" className="hover:text-green-700">
            Get Involved
          </a>

          <div className="border-t pt-3">
            <a href="/profile" className="block hover:text-green-700">
              Profile
            </a>
            <a href="/logout" className="block hover:text-green-700">
              Logout
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
