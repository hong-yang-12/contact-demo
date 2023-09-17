import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineContacts,
  AiOutlineStar,
} from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../redux/api/contactApi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const token = Cookies.get("token");
  const openSidebar = useSelector((state) => state.stateSlice.openSidebar);

  const current_page = 1;
  const { data } = useGetContactQuery({ token, current_page });
  // console.log(data);
  return (
    <div
      className={`${
        openSidebar
          ? "w-1/5 h-[42rem]  translate-x-0 transition-all duration-500 ease-in"
          : "w-0 h-0 -translate-x-96 transition-all duration-500 ease-out "
      }  shadow-xl  bg-buttonText cursor-pointer mt-2 pe-2`}
    >
      {/* className={`${!openSidebar && "hidden"}`} */}
      <div>
        <Link to={"/create"}>
          <button className=" flex items-center shadow-lg gap-2 m-5 bg-cyan-700 text-white px-6 py-3 rounded-full ">
            <AiOutlinePlusCircle className="text-2xl" />
            <span className="font-semibold">Create Contact</span>
          </button>
        </Link>
        <div className="w-full pe-2">
          <div className="w-full h-10 flex items-center justify-between rounded-e-full text-xl bg-cyan-500 drop-shadow-lg text-white my-2 px-5 py-7 ">
            <div className="flex items-center gap-3">
              <AiOutlineContacts />
              <span>Contacts</span>
            </div>
            <span className="text-sm">{data?.contacts?.total}</span>
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
    </div>
  );
};

export default Sidebar;
