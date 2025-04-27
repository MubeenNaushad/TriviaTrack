import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch } from 'react-icons/bs';

const StudentHeader = () => {
  return (
    <header className="mt-10 bg-gray-800 text-white items-end justify-end flex p-4 shadow-xl sticky top-0 z-40">
      <div className=" mb-2 ">


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
