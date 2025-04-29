import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoMdSettings, IoMdHelp } from "react-icons/io";
import { TbWorldHeart } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { PiVideoFill } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import UserProfile from "./UserProfile";

const Navigation = () => {
  const navigate = useNavigate();
  const hnadleLogout = async () =>{
    try{
      await signOut(auth);
      navigate("/login");
    }catch(error){
      console.log("Logout error : ",error);
      
    }
  };

  return (
    <>
      {/* Left Section - 1/3 Width */}
      <div
          style={{
            boxShadow:
              "0px 5px 10px rgba(0, 0, 0, 0.34)",
          }}
        
        className="w-[15%] h-full fixed left-0 top-0 z-10 bg-white "
      >
        <div className="p-5 flex items-center justify-center">
          <img src="./images/logo.jpg" alt="Logo" className="w-[140px]" />
        </div>

          {/* User profile */}
          <UserProfile/>

        {/* main nav */}
        <nav className="!mt-5 text-black font-semibold ">
          <ul className="">
            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <FaHome />
              </span>
              <NavLink>Home</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <TbWorldHeart />
              </span>
              <NavLink>Explore</NavLink>
            </li>

            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <GrFavorite />
              </span>
              <NavLink to="/favourite">My Favourites</NavLink>
            </li>
            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
              <PiVideoFill />
              </span>
              <NavLink to="/reels">Reels</NavLink>
            </li>
            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <IoMdHelp />
              </span>
              <NavLink to="/help">Help</NavLink>
            </li>
            <li className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
              <span>
                <IoMdSettings />
              </span>
              <NavLink>Settings</NavLink>
            </li>

            <li onClick={hnadleLogout} className="flex items-center gap-5 px-5 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
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
