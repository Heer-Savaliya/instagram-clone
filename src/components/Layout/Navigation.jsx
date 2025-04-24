import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoMdSettings, IoMdHelp } from "react-icons/io";
import { TbWorldHeart } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";

const Navigation = () => {
  return (
    <>
      {/* Left Section - 1/3 Width */}
      <div
          style={{
            boxShadow:
              "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
        
        className="w-[15%] h-[100dvh] bg-white "
      >
        <div className="p-5">
          <img src="./images/logo.jpg" alt="Logo" className="h-[45px] w-full" />
        </div>

        {/* main nav */}
        <nav className="!mt-10 text-black font-semibold ">
          <ul className="">
            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <FaHome />
              </span>
              <NavLink>Home</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <FaUserCircle />
              </span>
              <NavLink>Profile</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <TbWorldHeart />
              </span>
              <NavLink>Explore</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <GrFavorite />
              </span>
              <NavLink>My Favourites</NavLink>
            </li>
            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <IoMdHelp />
              </span>
              <NavLink>Help</NavLink>
            </li>
            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <IoMdSettings />
              </span>
              <NavLink>Settings</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <RiLogoutCircleRLine />
              </span>
              <NavLink>Logout</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
