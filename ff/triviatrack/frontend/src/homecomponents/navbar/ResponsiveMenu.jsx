import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ResponsiveMenu = ({ isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="absolute top-16 left-0 w-full h-screen bg-primary z-50 lg:hidden flex flex-col items-center py-10 px-6"
        >
          <ul className="flex flex-col justify-center items-center gap-6 text-white text-lg font-semibold uppercase w-full">
            <li>
              <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/live-session" className="hover:text-gray-300 transition">Live Session</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 transition">About</Link>
            </li>
            <li>
              <Link to="/students/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
            </li>
          </ul>
          
          <div className="flex flex-col items-center gap-4 mt-10 w-full">
            <Link to="/login" className="w-full">
              <button className="w-full max-w-xs px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-200 transition">
                Login
              </button>
            </Link>
            <Link to="/students/signup" className="w-full">
              <button className="w-full max-w-xs px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-200 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;