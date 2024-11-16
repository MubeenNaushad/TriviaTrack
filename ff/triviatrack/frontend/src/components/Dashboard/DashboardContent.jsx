import React from 'react';
import { BsBook, BsFillTrophyFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardContent = () => {
  const data = [
    { name: 'Hacking', avgGrade: 85 },
    { name: 'Programming', avgGrade: 78 },
    { name: 'Critical Thinking', avgGrade: 90 },
    { name: 'Webdev', avgGrade: 75 },
  ];

  return (
    <div className="p-6 bg-gray-100">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Courses</h3>
            <BsBook />
          </div>
          <h1 className="text-4xl mt-4">15</h1>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Achievements</h3>
            <BsFillTrophyFill />
          </div>
          <h1 className="text-4xl mt-4">8</h1>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3>Students</h3>
            <BsPeopleFill />
          </div>
          <h1 className="text-4xl mt-4">120</h1>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md shadow-md ">
          <div className="flex items-center justify-between">
            <h3>Alerts</h3>
            <BsFillBellFill />
          </div>
          <h1 className="text-4xl mt-4">5</h1>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded-md shadow-md overflow-auto">
          <h3 className="text-xl font-bold mb-4">Top Performing Students</h3>
          <div className="overflow-y-auto h-64">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">Rank</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">Name</th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">Score</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(20)].map((_, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">Student {index + 1}</td>
                    <td className="py-2 px-4 border-b">{Math.floor(Math.random() * 1000)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="bg-white p-4 rounded-md shadow-md h-64">
          <h3 className="text-xl font-bold mb-4">Average Grades by Courses</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgGrade" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
