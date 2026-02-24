import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import quiz from "../assets/quiz.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { setToken } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu ke liye

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* --- Logo Section --- */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <img src={quiz} alt="Logo" className="w-7 h-7 brightness-0 invert" />
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight">
            Quiz<span className="text-blue-600">Master</span>
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  My Profile
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-red-600 hover:shadow-red-100 transition-all duration-300 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* --- Mobile Dropdown --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          <NavLink to="/" className="block text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/profile" className="block text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
          <button 
            onClick={logoutHandler}
            className="w-full text-left text-red-600 font-bold pt-2 border-t"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;