import {
  BsBook,
  BsFillTrophyFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoticeBoard from "./NoticeBoard";
import PieChartComponent from "./PieChartComponent"; // Pie Chart Component

const DashboardContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thisUser, setThisUser] = useState({});
  const [rank, setRank] = useState(0);
  const [courses, setCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState([
    { name: "Completed", value: 40 },
    { name: "In Progress", value: 30 },
    { name: "Pending", value: 30 },
  ]);

  // Fetch user profile
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/profile`)
      .then((response) => {
        setThisUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  // Fetch students & determine rank
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students`)
      .then((response) => {
        setStudents(response.data);
        if (students.length > 0) {
          checkRank();
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Fetch Courses from Backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const checkRank = () => {
    const sortedStudents = students.sort((a, b) => b.points - a.points);
    const ranking =
      sortedStudents.findIndex((student) => student._id === thisUser._id) + 1;
    setRank(ranking);
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Courses</h3>
            <BsBook className="text-3xl" />
          </div>
          <h1 className="text-5xl font-bold mt-4">{courses.length}</h1>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-lg hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Rank</h3>
            <BsFillTrophyFill className="text-3xl" />
          </div>
          <h1 className="text-5xl font-bold mt-4">{rank}</h1>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-lg hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Points</h3>
            <BsPeopleFill className="text-3xl" />
          </div>
          <h1 className="text-5xl font-bold mt-4">{thisUser.length || 0}</h1>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-lg shadow-lg hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Alerts</h3>
            <BsFillBellFill className="text-3xl" />
          </div>
          <h1 className="text-5xl font-bold mt-4">5</h1>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">🏆 LeaderBoard</h3>
          <div className="overflow-y-auto h-64">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Rank
                  </th>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Name
                  </th>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {students
                  .sort((a, b) => b.points - a.points)
                  .map((student, index) => (
                    <tr key={student._id} className={`${index < 3 ? "bg-yellow-100" : ""}`}>
                      <td className="py-3 px-4 border-b">{index + 1}</td>
                      <td className="py-3 px-4 border-b">{student.name}</td>
                      <td className="py-3 px-4 border-b">{student.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">📌 Notice Board</h3>
          <NoticeBoard />
        </div>

        {/* Pie Chart */}
        <PieChartComponent progressData={courseProgress} />
      </div>
    </div>
  );
};

export default DashboardContent;
