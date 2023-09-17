import { Input } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm } from "../redux/services/contactSlice";
import UserMenu from "./UserMenu";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { controlSidebar } from "../redux/services/stateSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  const openSidebar = useSelector((state) => state.stateSlice.openSidebar);

  const toggleSidebar = () => {
    dispatch(controlSidebar(!openSidebar));
  };
  return (
    <div className="flex justify-between p-5 shadow items-center">
      <div className=" flex gap-14">
        <button className="text-2xl" onClick={toggleSidebar}>
          {openSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
        <Link to={"/"}>
          <h2 className=" flex items-center gap-1 text-2xl text-cyan-700 font-semibold">
            <BsFillTelephoneFill />
            <span>DEMO</span>
          </h2>
        </Link>
      </div>

      <div className="flex flex-col items-center ">
        <Input
          style={{ width: "500px" }}
          variant="filled"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      <div className=" cursor-pointer">
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
