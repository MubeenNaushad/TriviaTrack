import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); // Track userType (Student or Teacher)
  const [userName, setUserName] = useState(""); // Track user's name
  const [profilePhoto, setProfilePhoto] = useState(""); // Track user's profile photo
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/verifyuser`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.valid) {
          setIsLoggedIn(true);
          setUserType(response.data.user.userType); // Store userType
          setUserName(response.data.user.name); // Store user's name
          setProfilePhoto(response.data.user.photoUrl || "https://via.placeholder.com/40"); // Default photo
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });

    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setUserType(""); // Clear userType
        setUserName(""); // Clear userName
        setProfilePhoto(""); // Clear profile photo
        navigate("/students/login");
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-md text-white" : "bg-transparent text-black"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          TriviaTrack
        </div>

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
          {isLoggedIn && userType === "Student" && (
            <button
              onClick={() => navigate("/students/dashboard")}
              className="hover:text-blue-400 transition-all font-medium"
            >
              For Students
            </button>
          )}
          {isLoggedIn && userType === "Teacher" && (
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
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-blue-400 transition-all font-medium"
                onClick={toggleDropdown}
              >
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{userName}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => navigate("/students/profile")}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
    </nav>
  );
};

export default Navbar;
