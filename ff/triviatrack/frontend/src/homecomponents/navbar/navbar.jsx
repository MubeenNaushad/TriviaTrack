import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Import the UserContext
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user, login, logout } = useUser(); // Access global state and actions
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  useEffect(() => {
    // Fetch user details on mount
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/verifyuser`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.valid) {
          login({
            name: response.data.user.name,
            userType: response.data.user.userType,
            email: response.data.user.email,
            profilePhoto:
              response.data.user.photoUrl || "https://via.placeholder.com/40",
          });
        } else {
          logout();
        }
      })
      .catch(() => logout());

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [login, logout]);

  const handleLogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_BASEURL}/students/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        logout();
        navigate("/students/login");
      })
      .catch((err) => console.error("Error during logout:", err));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-md text-white" : "bg-transparent text-black"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-10 py-6 flex items-center justify-between">
        <div
          className="text-2xl font-bold flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          TriviaTrack
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-400 transition-all font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/courses")}
            className="hover:text-blue-400 transition-all font-medium"
          >
            Courses
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-blue-400 transition-all font-medium"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/live")}
            className="hover:text-blue-400 transition-all font-medium"
          >
            Live Session
          </button>
          {user?.userType === "Student" && (
            <button
              onClick={() => navigate("/students/dashboard")}
              className="hover:text-blue-400 transition-all font-medium"
            >
              For Students
            </button>
          )}
          {(user?.userType === "Teacher" || user?.userType === "Admin") && (
            <button
              onClick={() => navigate("/teacher/dashboard")}
              className="hover:text-blue-400 transition-all font-medium"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Right Side Buttons (Login/Register or Profile) */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-blue-400 transition-all font-medium"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-800 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => navigate("/students/profile")}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/students/login")}
                className="hover:text-blue-400 transition-all font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/students/signup")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Responsive Menu */}
      <ResponsiveMenu isOpen={isMenuOpen} />
    </nav>
  );
};

export default Navbar;
