import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

const StudentHeader = () => {
  return (
    <header className="mt-10 bg-gray-800 text-white p-4 shadow-xl sticky top-0 z-40">
      <div className="ml-6 pl-0 flex justify-between items-start container mx-auto sticky top-0">
        <div className="flex items-center space-x-4">
          <BsSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search for courses"
            className="border p-2 pr-8 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex items-center space-x-4 mt-3">
          <BsFillBellFill className="text-xl cursor-pointer size-7" title="Notifications for Achievements & Quizzes" />
          <BsFillEnvelopeFill className="text-xl cursor-pointer size-7" title="Messages from Instructors or Students" />
          <BsPersonCircle className="text-xl cursor-pointer size-7" title="Your Profile" />
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
