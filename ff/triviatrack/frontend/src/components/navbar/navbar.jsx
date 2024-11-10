import React from "react";
import { NavbarMenu } from "../../mockData/data.js";
import { MdComputer, MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import { useNavigate } from 'react-router-dom';


const navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="container flex justify-between items-center py-6">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold">
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
                      className="inline-block text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-seconday transition-all duration-300 font-semibold"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button  */}
          <div className="hidden lg:block space-x-6">
            <button className="font-semibold" onClick={() => navigate('/login')}>Sign in</button>
            <button className="text-white bg-seconday font-semibold rounded-full px-4 py-2" onClick={() => navigate('/signup')}>
              Register
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </motion.div>

      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default navbar;
