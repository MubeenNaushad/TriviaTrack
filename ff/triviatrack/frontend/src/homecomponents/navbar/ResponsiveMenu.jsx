import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';


const ResponsiveMenu = ({ isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 px-50 mr-50 w-full h-screen z-20 lg:hidden"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>
                <Link to="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition">

                  Live session
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/students/dashboard" className="hover:text-gray-300 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300 transition">
                  Contact
                </Link>
              </li>
              <div className="flex gap-4 mt-10">
                <Link to="/login">
                  <button className="px-6 py-2 bg-white text-primary font-semibold rounded-full hover:bg-gray-200 transition">
                    Login
                  </button>
                </Link>
                <Link to="/students/signup">
                  <button className="px-6 py-2 bg-white text-primary font-semibold rounded-full hover:bg-gray-200 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
