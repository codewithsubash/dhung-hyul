import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold">My Site</div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
        <a href="/about" className="hover:text-blue-600">
          About
        </a>
        <a href="/sign-in" className="hover:text-blue-600">
          Sign In
        </a>

        <div className="relative">
          <button onClick={() => setUserMenuOpen(!userMenuOpen)}>User</button>
          {userMenuOpen && (
            <div className="absolute right-0 bg-white shadow rounded p-2">
              <a href="/profile" className="block">
                Profile
              </a>
              <a href="/logout" className="block">
                Logout
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow p-4 flex flex-col gap-3 md:hidden">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/sign-in">Sign In</a>

          <div className="border-t pt-2">
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      )}
    </header>
  );
}
