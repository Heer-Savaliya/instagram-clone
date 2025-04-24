import React from "react";
import { IoMdSearch } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between">
        {/* Left Section - 1/3 Width */}
        <div className="w-[15%] flex items-center justify-center">
          <img src="./images/logo.jpg" alt="Logo" className="h-[50px] w-full" />
        </div>

        {/* Center Section - 1/3 Width */}
        <div className="w-[60%] flex items-center justify-center gap-6 bg-amber-300">
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

        {/* Right Section - 1/3 Width */}
        <div className="w-[25%] flex items-center justify-end gap-6">
          <FaPaperPlane size={20} />
          <MdNotificationsActive size={25} />
          <IoMenu size={25} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
