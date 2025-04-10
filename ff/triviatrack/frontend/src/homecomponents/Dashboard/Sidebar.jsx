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
import {useUser} from "@/context/UserContext.jsx";


const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="mt-8 w-100 bg-gray-800 text-white h-screen p-5 sticky top-0">
      <div className="font-bold text-lg mb-4">
        <BsBook className="inline-block mr-4" /> Teacher Dashboard
      </div>
      <ul className="space-y-5">
      <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/teacher/dashboard" className="flex items-center">
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
            <BsFillPeopleFill className="inline-block mr-2" /> Students
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/enrolledstudents">
          <BsListTask className="inline-block mr-2" /> Your Students
          </Link>
        </li>
        <>
        {(user?.userType === "Student") &&
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/financial-aid-applications">
          <BsListTask className="inline-block mr-2" /> Financial Aid Applications
          </Link>
        </li>
      }
        </>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/leaderboard">
          <BsListTask className="inline-block mr-2" /> Leaderboard
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link to="/settings">
          <BsFillGearFill className="inline-block mr-2" /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
