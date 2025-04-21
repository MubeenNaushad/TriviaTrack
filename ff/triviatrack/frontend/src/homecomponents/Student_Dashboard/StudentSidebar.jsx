import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import {
  BsBook,
  BsClipboardCheck,
  BsFillBarChartFill,
  BsFillPeopleFill,
  BsListTask,
  BsFillGearFill
} from 'react-icons/bs';
import { CiPen } from "react-icons/ci";
import { FaRobot } from 'react-icons/fa';
import Spacegame from "./SpaceGame.jsx";


const StudentSidebar = () => {
  return (
    <aside className="mt-10 w-68 sm:h-screen bg-gray-800 text-white p-5 sticky top-0 z-40">
      <div className="font-bold text-2xl mb-12">
        <BsBook className="inline-block mr-4" /> Student Dashboard
      </div>
      <ul className="space-y-9">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/students/dashboard" className="flex items-center hover:scale-105 transition-all duration-300 text-lg">
            <BsFillPeopleFill className="inline-block mr-2" /> Dashboard
          </Link>
        </li>

        <li className="flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="">
            <BsClipboardCheck className="inline-block mr-2" /> Assignments
          </Link>
        </li>
        <li className="flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="/quiz" className="flex items-center">
            <CiPen className="inline-block mr-2" /> Quiz
          </Link>
        </li>

        <li className="flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="/students/progresstrack">
            <BsListTask className="inline-block mr-2" /> Progress Tracker
          </Link>
        </li>
        <li className=
          "flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="/settings">
            <BsFillGearFill className="inline-block mr-2" /> Settings
          </Link>
        </li>

        <li className=
          "flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="/game">
            <BsFillGearFill className="inline-block mr-2" /> Game
          </Link>
        </li>
        <li className=
          "flex items-center p-2 hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
          <Link to="/recommendation-system">
            <FaRobot className="inline-block mr-2" /> Recommendations
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default StudentSidebar;
