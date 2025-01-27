import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

const StudentHeader = () => {
  return (
    <header className="bg-white p-4 shadow-md sticky top-0 z-40">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center">
          <BsSearch className="text-xl mr-2" />
          <input
            type="text"
            placeholder="Search for courses or students..."
            className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex items-center space-x-4">
          <BsFillBellFill className="text-xl cursor-pointer" title="Notifications for Achievements & Quizzes" />
          <BsFillEnvelopeFill className="text-xl cursor-pointer" title="Messages from Instructors or Students" />
          <BsPersonCircle className="text-xl cursor-pointer" title="Your Profile" />
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
