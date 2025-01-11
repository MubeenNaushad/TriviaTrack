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

const Sidebar = () => {
  return (
    <aside className="w-68 bg-gray-800 text-white h-screen p-5 sticky top-0">
      <div className="font-bold text-lg mb-4">
        <BsBook className="inline-block mr-4" /> Teacher Dashboard
      </div>
      <ul className="space-y-5">
      <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/dashboard" className="flex items-center">
            <BsFillPeopleFill className="inline-block mr-2" /> Dashboard
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/list-course" className="flex items-center">
            <BsFillPeopleFill className="inline-block mr-2" /> Course
          </Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsClipboardCheck className="inline-block mr-2" /> Assignments
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/Studentdata" className="flex items-center">
            <BsFillPeopleFill className="inline-block mr-2" /> Student
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsListTask className="inline-block mr-2" /> Progress Tracker
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsFillGearFill className="inline-block mr-2" /> Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
