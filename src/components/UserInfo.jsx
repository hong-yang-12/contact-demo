import Cookies from 'js-cookie';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetSingleContactQuery } from '../redux/api/contactApi';
import {AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome} from "react-icons/ai"

const UserInfo = () => {
    const {id} = useParams();
    const token = Cookies.get("token");
    const {data} = useGetSingleContactQuery({id,token})
    console.log(data);
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col gap-5 p-7 shadow-lg rounded'>
            <img className='rounded-full' src={data?.contact?.photo === null ? "https://cdn-icons-png.flaticon.com/512/21/21104.png" : data?.contact?.photo} width={"150px"} alt="" />
            <p className='flex items-center gap-2'><AiOutlineUser/> <span>{data?.contact?.name}</span></p>
            <p className='flex items-center gap-2'><AiOutlinePhone/> <span>{data?.contact?.phone}</span></p>
            <p className='flex items-center gap-2'><AiOutlineMail/> <span>{data?.contact?.email}</span></p>
            <p className='flex items-center gap-2'><AiOutlineHome/> <span>{data?.contact?.address}</span></p>
            <Link to={"/"}>
            <button className='bg-cyan-500 px-5 py-1 text-white'>Back</button>
            </Link>
        </div>
    </div>
  )
}

export default UserInfo