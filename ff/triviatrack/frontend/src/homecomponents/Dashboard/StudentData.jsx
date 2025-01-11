import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';


export const StudentData = () => {
    const [students, setStudents] = useState([]);

useEffect(() => {
  axios.get(`${import.meta.env.VITE_APP_BASEURL}/students`)
    .then((response) => {
      console.log("Students fetched:", response.data);
      setStudents(response.data);
    })
    .catch((error) => {
      console.error("Error fetching students:", error);
    });
}, []);
  return (
    <div className='flex pt-[2.4rem]'>
        <Sidebar/>
    <div className="flex-1 mx-10 mt-10">

    <div className="bg-white p-4 rounded-md shadow-md overflow-auto">
      <h3 className="text-xl font-bold mb-4 items-center justify-center flex">Trivia Track Users</h3>
      <div className="overflow-y-auto h-64">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">S.No</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">Email</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-bold text-gray-600">User Type</th>
            </tr>
          </thead>
          <tbody>
    {students.map((student, index) => (
      <tr key={student._id}>
        <td className="py-2 px-4 border-b">{index + 1}</td>
        <td className="py-2 px-4 border-b">{student.name}</td>
        <td className="py-2 px-4 border-b">{student.email}</td>
        <td className="py-2 px-4 border-b">{student.userType}</td>
      </tr>
    ))}
    </tbody>
            </table>
        </div>
    
      
    </div>
    </div>
    </div>
    )
}