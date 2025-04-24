import React from "react";
import { IoMdSearch } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";

const TopBar = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="">
          <img src="./images/logo.jpg" alt="" className="h-[50px]" />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <div className="flex px-3 py-2 border-2 border-gray-400 rounded-4xl items-center w-[450px]">
              <IoMdSearch />
              <input
                type="text"
                name="Search"
                id=""
                placeholder="Search"
                className="border-none outline-none pl-3 w-full"
              />
              <AiFillAudio />
            </div>
          </div>
          <div>
            <button className="bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 text-white px-4 py-3 rounded-full capitalize text-sm font-semibold">
              create new post
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
        <FaPaperPlane size={20}/>
        <MdNotificationsActive size={20}/>
        <IoMenu size={20}/>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
