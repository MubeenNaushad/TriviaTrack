import React from "react";
import { NavbarMenu } from "../../mockData/data.js";
import { MdComputer, MdMenu, MdPerson } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios"; 

const navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
   
    window.addEventListener('scroll', handleScroll);
  
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  useEffect(() => {
    axios.get("http://localhost:3001/verifyuser", { withCredentials: true })
      .then(response => {
        if (response.data.valid) {
          setIsLoggedIn(true);
          setUserName(response.data.user.name); 
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  });
  

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch(err => {
        console.error("Error during logout:", err);
      });
  };



  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}

        
      >
        <div className="container flex justify-between items-center py-6">

        
        <div className={`fixed top-0 left-0 right-0 w-full z-50 px:4 lg:px-10 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-md text-white' : 'bg-transparent text-gray-800'
       } flex justify-between items-center py-6`}>

          <div className={`text-2xl flex items-center gap-2 font-bold ${isScrolled ? 'text-white' : 'text-gray-800'}`}>
            <MdComputer className="text-3xl text-seconday" />
            <p>TriviaTrack</p>
          </div>

          {/* Menu  */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className={`${isScrolled ? 'text-white' : 'text-gray-600'}inline-block text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-seconday transition-all duration-300 font-semibold`}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

         
          <div className="hidden lg:block space-x-6">
            {!isLoggedIn ? (
            <>
            <button className="font-semibold" onClick={() => navigate('/login')}>Sign in</button>
            <button className="text-white bg-seconday font-semibold rounded-full px-4 py-2" onClick={() => navigate('/signup')}>
              Register
            </button>
            </>
            ) : (
              <div className="relative inline-block text-left">
              <button className="flex items-center gap-2 font-semibold"  onClick={handleToggleDropdown}>
                <MdPerson className="text-xl" />
                {userName}
                <svg class="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className={`${isDropdownOpen ? "" : "hidden"} absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50`}>
                <div className="py-1">
                <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => navigate('/dashboard')}
                  >
                    My Profile
                  </button>
                <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => navigate('/dashboard')}
                  >
                    My Courses
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={handleLogout}
                  >
                   
                    Logout
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
        </div>
      </motion.div>

      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default navbar;

