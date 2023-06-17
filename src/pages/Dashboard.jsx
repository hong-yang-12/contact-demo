import React from "react";
import ContactTable from "../components/ContactTable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import UserInfo from "../components/UserInfo";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex p-2">
        <Sidebar />
        <ContactTable />
        
      </div>
    </div>
  );
};

export default Dashboard;
