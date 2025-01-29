import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import {useUser} from "@/context/UserContext.jsx";


const Dashboard = () => {
  const { user } = useUser();

  return (
    <>
    {(user?.userType === "Admin") || (user?.userType === "Teacher") ? (<div className="flex pt-[2.4rem]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Routes>


            <Route path="/" element={<DashboardContent />} />
            
          </Routes>
        </div>
      </div>
    </div>) : (<h1 className="text-2xl text-center font-bold mt-24">You are not a teacher.</h1>) }
    </>
  );
};

export default Dashboard;
