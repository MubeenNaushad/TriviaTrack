import React from 'react';
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
          <BsFillBarChartFill className="inline-block mr-2" /> Dashboard
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsBook className="inline-block mr-2" /> Courses
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsClipboardCheck className="inline-block mr-2" /> Assignments
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <BsFillPeopleFill className="inline-block mr-2" /> Students
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
