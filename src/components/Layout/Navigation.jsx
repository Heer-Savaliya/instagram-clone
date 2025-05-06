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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.34)" }}
      className="h-full fixed left-0 top-0 z-10 bg-white w-[45px] lg:w-[220px] transition-all duration-300"
    >
      {/* Logo */}
      <div className="p-3 flex items-center justify-center lg:justify-center">
  
  <img
    src="./images/white_logo.jpg"
    alt="Small Logo"
    className="block lg:hidden w-[30px]" 
  />

  <img
    src="./images/logo.jpg"
    alt="Logo"
    className="hidden lg:block w-[140px]"
  />
</div>


      {/* User Profile */}
      <div className="hidden lg:block">
        <UserProfile />
      </div>

      {/* Navigation Menu */}
      <nav className="mt-5 text-black font-semibold">
        <ul>
          <li onClick={()=>navigate("/")} className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <FaHome />
            <NavLink to="/" className="hidden lg:inline">
              Home
            </NavLink>
          </li>

          <li onClick={()=>navigate("/explore")}  className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <TbWorldHeart />
            <NavLink to="/explore" className="hidden lg:inline">
              Explore
            </NavLink>
          </li>

          <li onClick={()=>navigate("/favourite")} className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <GrFavorite />
            <NavLink to="/favourite" className="hidden lg:inline">
              My Favourites
            </NavLink>
          </li>

          <li onClick={()=>navigate("/reels")} className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <PiVideoFill />
            <NavLink to="/reels" className="hidden lg:inline">
              Reels
            </NavLink>
          </li>

          <li onClick={()=>navigate("/help")} className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <IoMdHelp />
            <NavLink to="/help" className="hidden lg:inline">
              Help
            </NavLink>
          </li>

          <li onClick={()=>navigate("/setting")} className="flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all">
            <IoMdSettings />
            <NavLink to="/setting" className="hidden lg:inline">
              Settings
            </NavLink>
          </li>

          <li
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-5 px-3 py-3 hover:bg-pink-50 hover:text-pink-500 hover:border-l-4 hover:border-pink-500 transition-all"
          >
            <RiLogoutCircleRLine />
            <span className="hidden lg:inline">Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
