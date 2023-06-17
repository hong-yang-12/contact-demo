import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineContacts,AiOutlineStar, } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../redux/api/contactApi";

const Sidebar = () => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  return (
    <div className=" w-96 shadow-lg h-[38.5rem] cursor-pointer">
      <Link to={"/create"}>
        <button className=" flex items-center shadow-lg gap-2 m-5 bg-cyan-700 text-white px-6 py-3 rounded-full ">
          <AiOutlinePlusCircle />
          <span className="font-semibold">Create Contact</span>
        </button>
      </Link>
      <div className="w-full pe-2">
        <div className="w-full h-10 flex items-center justify-between rounded-e-full text-xl bg-cyan-500 drop-shadow-lg text-white my-2 px-5 py-7 ">
          <div className="flex items-center gap-3">
            <span>
              <AiOutlineContacts />
            </span>
            <span>Contacts</span>
          </div>
          <span>{data?.contacts?.data.length}</span>
        </div>
        <div className="w-full h-10 flex items-center justify-between rounded-e-full text-xl my-2 px-5 py-7 ">
          <div className="flex items-center gap-3">
            <span>
              <AiOutlineStar />
            </span>
            <span>Favorite Contacts</span>
          </div>
          <span>0</span>
        </div>
        <div className="w-full h-10 flex items-center justify-between rounded-e-full text-xl my-2 px-5 py-7 ">
          <div className="flex items-center gap-3">
            <span>
              <RiContactsBook2Line />
            </span>
            <span>Other Contacts</span>
          </div>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
