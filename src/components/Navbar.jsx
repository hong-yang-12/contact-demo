import { Input } from "@mantine/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/services/contactSlice";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);

  return (
    <div className="flex justify-around p-5 shadow items-center">
      <h2 className="text-2xl text-cyan-700 font-semibold">DEMO</h2>

      <div className="flex flex-col items-center ">
        <Input
          style={{ width: '500px' }}
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
