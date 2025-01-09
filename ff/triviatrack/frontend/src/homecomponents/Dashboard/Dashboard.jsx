import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex pt-[2.4rem]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
