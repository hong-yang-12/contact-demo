import Cookies from "js-cookie";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
} from "react-icons/ai";

const UserInfo = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data } = useGetSingleContactQuery({ id, token });

  const imgUrl = data?.contact?.photo;
  // const img = useGetProfileQuery( token );
  // console.log(img);
  console.log(data);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-10 p-20 shadow-lg rounded">
        {/* <img
          className="rounded-full"
          src={
            data?.contact?.photo === null
              ? "https://cdn-icons-png.flaticon.com/512/21/21104.png"
              : data?.contact?.photo
          }
          width={"150px"}
          alt=""
        /> */}
        <div className="flex justify-center">
          {data?.contact?.photo === null ? (
            <div
              className={` w-24 h-24 flex justify-center items-center rounded-full text-3xl text-background bg-placeholder p-2`}
            >
              {data?.contact?.name.charAt(0)}
            </div>
          ) : (
            <img
              className="rounded-full bg-cover bg-center object-cover"
              src={data?.contact?.photo}
              width={"20px"}
              height={"20px"}
              alt="profile-img"
            />
          )}
        </div>
        <p className="flex items-center gap-2">
          <AiOutlineUser /> <span>{data?.contact?.name}</span>
        </p>
        <p className="flex items-center gap-2">
          <AiOutlinePhone /> <span>{data?.contact?.phone}</span>
        </p>
        <p className="flex items-center gap-2">
          <AiOutlineMail /> <span>{data?.contact?.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <AiOutlineHome /> <span>{data?.contact?.address}</span>
        </p>
        <div className="flex gap-2">
          <Link to={"/"}>
            <button className="border border-cyan-500 rounded px-5 py-1 text-cyan-500">Back</button>
          </Link>
          <Link to={`/edit/${data?.contact?.id}`}>
            <button className="bg-cyan-500 rounded px-5 py-1 text-white">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
