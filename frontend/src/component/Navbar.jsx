import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import quiz from "../assets/quiz.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { setToken } = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <nav className="
      sticky top-0 z-50 bg-white
      shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
      hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]
      transition-shadow duration-300
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={quiz} alt="Quiz Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
            QuizApp
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-lg font-medium transition ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`
            }
          >
            Profile
          </NavLink>

          {/* Logout */}
          <button
            onClick={logoutHandler}
            className="
              bg-blue-600 text-white px-5 py-2 rounded-lg font-medium
              shadow-md hover:shadow-lg
              hover:bg-blue-700 active:scale-95 transition-all
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
