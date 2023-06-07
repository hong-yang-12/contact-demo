import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className=" text-4xl mb-5">Error 404 not found!</h1>
      <Link to={"/login"}>
        <button className=" bg-cyan-500 text-white px-4 py-1">Back</button>
      </Link>
    </div>
  );
};

export default Notfound;
