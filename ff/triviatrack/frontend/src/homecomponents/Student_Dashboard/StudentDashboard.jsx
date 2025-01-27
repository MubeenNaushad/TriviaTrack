import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentHeader from "./StudentHeader";
import Studentsidebar from "./StudentSidebar";
import StudentDashboard from "./StudentDashboardContent";





const StuDashboard = () => {
  return (
    <div className="flex pt-[2.4rem]">
      <Studentsidebar />
      <div className="flex-1">
        <StudentHeader />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StuDashboard;
