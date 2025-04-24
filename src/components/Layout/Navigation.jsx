import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome ,FaUserCircle } from "react-icons/fa";
import { IoMdSettings,IoMdHelp } from "react-icons/io";
import { TbWorldHeart } from "react-icons/tb";
import { GrFavorite } from "react-icons/gr";

const Navigation = () => {
  return (
    <>
      {/* Left Section - 1/3 Width */}
      <div className="w-[15%] h-[100dvh]  p-5">
        <img src="./images/logo.jpg" alt="Logo" className="h-[40px] w-full" />

        {/* main nav */}
        <nav className="!mt-10">
          <ul>
            <li className="flex items-center gap-5">
              <span>
                <FaHome />
              </span>
              <NavLink>Home</NavLink>
            </li>

            <li className="flex items-center gap-5">
              <span>
              <FaUserCircle />
              </span>
              <NavLink>Profile</NavLink>
            </li>

            <li className="flex items-center gap-5">
              <span>
              <TbWorldHeart />
              </span>
              <NavLink>Explore</NavLink>
            </li>

            <li className="flex items-center gap-5">
              <span>
              <GrFavorite />
              </span>
              <NavLink>My Favourites</NavLink>
            </li>

            <li className="flex items-center gap-5">
              <span>
              <GrFavorite />
              </span>
              <NavLink>My Favourites</NavLink>
            </li>
            <li className="flex items-center gap-5">
              <span>
              <IoMdHelp />
              </span>
              <NavLink>Help</NavLink>
            </li>
            <li className="flex items-center gap-5">
              <span>
              <IoMdSettings />
              </span>
              <NavLink>Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
