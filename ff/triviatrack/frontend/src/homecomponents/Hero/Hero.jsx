import React from "react";
import HeroImg from "../../assets/hero.png";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6 mt-8">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
              100% Satisfaction Guarantee
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-4xl font-semibold lg:text-6xl !leading-tight"
            >
              Best Platform For{" "}
              <span className="text-primary">Gamified Learning</span>
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
              We Aim To Improve your Knowledge Retention By Gamified Quizes And
              Learning Videos
            </motion.p>

            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <Link to="/students/signup">
              <motion.button
                className="bg-gray-800 text-white px-6 py-2 rounded-3xl font-semibold"
                whileHover={{ scale: 1.05, color: "#fff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get Started
              </motion.button>
              </Link>
<Link to="/courses">
              <button className="flex justify-end items-center gap-2 font-semibold">
                <span className="w-10 h-10 bg-secondary/15 rounded-full flex justify-center items-center">
                  <FaPlay className="text-seconday" />
                </span>
                View Courses
              </button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            src={HeroImg}
            alt="hero"
            className="w-[350px] md:w-[550px] xl:w-[700px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
