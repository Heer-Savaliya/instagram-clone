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
              <PiVideoFill />
              </span>
              <NavLink>Reels</NavLink>
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

            <li onClick={hnadleLogout} className="flex items-center gap-5 px-5 py-4 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all duration-300 ease-in-out">
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
