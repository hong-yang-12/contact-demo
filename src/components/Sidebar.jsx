import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlinePlusCircle} from "react-icons/ai"

const Sidebar = () => {
  return (
    <div className=' w-72'>
        <Link to={"/create"}>
          <button className=" flex items-center shadow-lg gap-2 m-5 bg-cyan-500 text-white px-6 py-3 rounded-full ">
            <AiOutlinePlusCircle/>
            <span className='font-semibold'>Create Contact</span>
          </button>
        </Link>
    </div>
  )
}

export default Sidebar