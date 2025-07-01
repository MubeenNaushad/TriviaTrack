import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, login, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  axios.defaults.withCredentials = true; 

  useEffect(() => {

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
              response.data.user.photoUrl || `https://ui-avatars.com/api/?name=${response.data.user.name}&background=6366f1&color=ffffff&size=40`,
          });
        } else {
          logout();

        }
      })
      .catch(() => logout());


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
        toast.success("Logged Out Successfully")
      })
      .catch((err) => console.error("Error during logout:", err));
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {

      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {

      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-gray-900 shadow-md text-white"
        : "bg-transparent text-black"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-10 py-6 flex items-center justify-between">
        <div
          className="text-2xl font-bold flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          TriviaTrack
        </div>

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
          {/* {(user?.userType === "Teacher") || (user?.userType === "Admin") && (
            <>
              <button
                onClick={() => navigate("/teacher/dashboard")}
                className="hover:text-blue-400 transition-all font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/teacher/profile/view")}
                className="hover:text-blue-400 transition-all font-medium"
              >
                My Profile
              </button>
            </>
          )} */}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 hover:text-blue-400 transition-all font-medium"
                onClick={toggleDropdown}
              >
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
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
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => navigate("/students/profile")}
                  >
                    My Profile
                  </button>
                  {user.userType === "Teacher" && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => navigate("/teacher/profile/view")}
                    >
                      Teacher Profile
                    </button>
                  )}
                  {(user.userType === "Teacher") || (user.userType === "Admin") ? (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => navigate("/teacher/dashboard")}
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => navigate("/students/dashboard")}
                    >
                      Dashboard
                    </button>
                  )}
                  {user.userType === "Student" ? (<button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => navigate("/students/my-learning")}
                  >
                    My Learning
                  </button>) : null}

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