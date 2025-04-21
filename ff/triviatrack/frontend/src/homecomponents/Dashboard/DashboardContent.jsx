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

const DashboardContent = () => {
  const data = [
    { name: "Hacking", avgGrade: 85 },
    { name: "Programming", avgGrade: 78 },
    { name: "Critical Thinking", avgGrade: 90 },
    { name: "Webdev", avgGrade: 75 },
  ];

  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students`)
      .then((response) => {
        console.log("Students fetched:", response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Teacher Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Courses",
            count: 15,
            color: "bg-blue-500",
            icon: <BsBook />,
          },
          {
            title: "Achievements",
            count: 8,
            color: "bg-orange-500",
            icon: <BsFillTrophyFill />,
          },
          {
            title: "Students",
            count: 120,
            color: "bg-green-500",
            icon: <BsPeopleFill />,
          },
          {
            title: "Alerts",
            count: 5,
            color: "bg-red-500",
            icon: <BsFillBellFill />,
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`${card.color} text-white p-6 rounded-lg shadow-md flex items-center justify-between`}
          >
            <div>
              <h3 className="text-lg font-medium">{card.title}</h3>
              <h1 className="text-4xl mt-2 font-bold">{card.count}</h1>
            </div>
            <div className="text-4xl">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-xl font-semibold mb-4">
            Top Performing Students
          </h3>
          <div className="overflow-y-auto max-h-64">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 border-b font-medium text-gray-600">
                    Rank
                  </th>
                  <th className="py-3 px-4 border-b font-medium text-gray-600">
                    Name
                  </th>
                  <th className="py-3 px-4 border-b font-medium text-gray-600">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    <td className="py-3 px-4 border-b">{student.name}</td>
                    <td className="py-3 px-4 border-b">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Average Grades Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md h-72">
          <h3 className="text-xl font-semibold mb-4">
            Average Grades by Courses
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
            >
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgGrade" fill="#4A90E2" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
