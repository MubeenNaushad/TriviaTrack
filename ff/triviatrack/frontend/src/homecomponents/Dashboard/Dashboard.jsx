import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";





const Dashboard = () => {
  return (
    <div className="flex pt-[2.4rem]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
