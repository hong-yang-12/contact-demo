import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateContact from "../components/CreateContact";
import EditContact from "../components/EditContact";
import RouteGuard from "../components/RouteGuard";
import UserInfo from "../components/UserInfo";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Notfound from "../pages/Notfound";
import Register from "../pages/Register";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notfound" element={<Notfound />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/user/:id" element={<UserInfo />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default Path;
