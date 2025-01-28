import {
  BsBook,
  BsFillTrophyFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const DashboardContent = () => {
  const data = [
    { name: "Hacking", avgGrade: 85 },
    { name: "App Dev", avgGrade: 78 },
    { name: "Critical Thinking", avgGrade: 90 },
    { name: "Webdev", avgGrade: 75 },
  ];

  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [thisUser, setThisUser] = useState({});
  const [rank, setRank] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/profile`)
      .then((response) => {
        console.log("yh", response.data.user);
        setThisUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students`)
      .then((response) => {
        console.log("Students fetched:", response.data);
        setStudents(response.data);
        if (students.length > 0) {
          checkRank();
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const checkRank = () => {
    const sortedStudents = students.sort((a, b) => b.points - a.points);
    const ranking =
      sortedStudents.findIndex((student) => student._id === thisUser._id) + 1;
    console.log("rr", ranking);
    setRank(ranking);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // You can integrate event handling here
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Courses</h3>
            <BsBook />
          </div>
          <h1 className="text-4xl mt-4">{thisUser?.enrolledcourses?.length}</h1>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Rank</h3>
            <BsFillTrophyFill />
          </div>
          {students.length > 0 && <h1 className="text-4xl mt-4">{rank}</h1>}
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Points</h3>
            <BsPeopleFill />
          </div>
          {<h1 className="text-4xl mt-4">{thisUser.points}</h1>}
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Alerts</h3>
            <BsFillBellFill />
          </div>
          <h1 className="text-4xl mt-4">5</h1>
        </div>
      </div>

      {/* Leaderboard and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-md shadow-md overflow-auto">
          <h3 className="text-xl font-bold mb-4">LeaderBoard</h3>
          <div className="overflow-y-auto h-64">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Rank
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {students
                  .sort((a, b) => b.points - a.points)
                  .map((student, index) => (
                    <tr key={student._id}>
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{student.name}</td>
                      <td className="py-2 px-4 border-b">{student.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ml-16 mt-0 flex ">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4">Calendar</h3>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className=""
            />
          </div>
        </div>
      </div>

      {/* Calendar Integration */}
    </div>
  );
};

export default DashboardContent;
