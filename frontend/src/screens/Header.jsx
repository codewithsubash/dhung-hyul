import { useState, useEffect } from "react";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import ClearOutlined from "@mui/icons-material/ClearOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Hide/show header on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 100) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-6 left-0 right-0 z-50 mx-12 px-6 py-2 
  bg-[#EDF5F2]/90 backdrop-blur-lg rounded-full shadow-sm 
  transition-transform duration-500 flex items-center justify-between
  ${showHeader ? "translate-y-0" : "-translate-y-[calc(100%+3.5rem)]"}`}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-green-700"></div>
        <span className="text-xl font-semibold">Harbour</span>
      </div>

      {/* DESKTOP MENU */}
      <nav className="hidden min-[1395px]:flex items-center gap-10 text-[16px] font-medium">
        <a href="/" className="hover:text-green-700 transition">
          Home
        </a>

        <a href="/programmes" className="hover:text-green-700 transition">
          Programmes
        </a>

        <a href="/gallery" className="hover:text-green-700 transition-colors">
          Gallery
        </a>
        <a href="/events" className="hover:text-green-700 transition-colors">
          Event
        </a>
        <a href="/contact" className="hover:text-green-700 transition-colors">
          Contact
        </a>
        <a
          href="/getinvolved"
          className="hover:text-green-700 transition-colors"
        >
          Get Involved
        </a>

        <a href="/events" className="hover:text-green-700 transition">
          Events
        </a>

        {/* ABOUT US DROPDOWN */}
        <div
          className="relative group"
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <button className="flex items-center py-2 hover:text-green-700 transition">
            About Us <KeyboardArrowDownOutlined fontSize="small" />
          </button>

          {aboutOpen && (
            <div
              className="absolute top-10 left-0 bg-white shadow-lg rounded-2xl 
              p-4 w-48 animate-fadeIn"
            >
              <a
                className="block px-2 py-2 rounded hover:bg-gray-100"
                href="/about"
              >
                Who we are
              </a>
              <a
                className="block px-2 py-2 rounded hover:bg-gray-100"
                href="/blog"
              >
                Our Blog
              </a>
              <a
                className="block px-2 py-2 rounded hover:bg-gray-100"
                href="/supporters"
              >
                Our Supporters
              </a>
            </div>
          )}
        </div>

        <a href="/contact" className="hover:text-green-700 transition">
          Contact
        </a>

        {/* LOG IN BUTTON (instead of Get Involved) */}
        <a
          href="/sign-in"
          className="px-4 py-[6px] rounded-xl border border-green-700 text-green-800 
          hover:bg-green-700 hover:text-white transition"
        >
          Log In
        </a>

        {/* DONATE */}
        <a
          href="/donate"
          className="bg-green-800 text-white px-5 py-[7px] rounded-xl hover:bg-green-700 transition"
        >
          Donate
        </a>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <button
        className="min-[1395px]:hidden text-3xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {!mobileOpen ? <MenuOutlined /> : <ClearOutlined />}
      </button>

      {/* MOBILE MENU DRAWER */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-5 flex flex-col gap-4 min-[1395px]:hidden">
          <a href="/" className="hover:text-green-700">
            Home
          </a>
          <a href="/programmes" className="hover:text-green-700">
            Programmes
          </a>
          <a href="/events" className="hover:text-green-700">
            Events
          </a>

          <a href="/gallery" className="hover:text-green-700">
            Gallery
          </a>

          {/* ABOUT US MOBILE DROPDOWN */}
          <details>
            <summary className="cursor-pointer flex items-center justify-between">
              About Us <KeyboardArrowDownOutlined />
            </summary>
            <div className="ml-3 mt-2 flex flex-col gap-2">
              <a href="/who-we-are" className="hover:text-green-700">
                Who we are
              </a>
              <a href="/blog" className="hover:text-green-700">
                Our Blog
              </a>
              <a href="/supporters" className="hover:text-green-700">
                Our Supporters
              </a>
            </div>
          </details>

          <a href="/contact" className="hover:text-green-700">
            Contact
          </a>

          <a href="/sign-in" className="hover:text-green-700">
            Log In
          </a>

          <a
            href="/donate"
            className="bg-green-800 text-white text-center py-2 rounded-full mt-2"
          >
            Donate
          </a>
        </div>
      )}
    </header>
  );
}
