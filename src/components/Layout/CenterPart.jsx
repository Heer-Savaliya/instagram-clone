import React from "react";
import { IoMdSearch } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import { Outlet } from "react-router-dom";

const CenterPart = () => {
  return (
    <>
      <div className="w-[60%] mx-auto h-[100dvh] !p-5">
        <div className="flex items-center justify-center gap-10">
          {/* Search Bar */}
          <div className="flex px-3 py-2 border-2 border-gray-400 rounded-full items-center w-full max-w-[400px]">
            <IoMdSearch />
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none pl-3 w-full"
            />
            <AiFillAudio />
          </div>
          {/* Button */}
          <button className="bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-white px-4 py-3 rounded-full capitalize text-sm font-semibold">
            create new post
          </button>
        </div>


        <div>
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default CenterPart;
