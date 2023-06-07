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
        <div className=" w-96 flex justify-center items-center">
          <p>user info will show here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
