import React, { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import Suggestion from "../Ui/Suggestion";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const RightPart = ({ isMobile = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const { userData, loading } = useContext(UserContext);
  if (loading || !userData) return <p>Loading...</p>;

  return (
    <div
  className={`fixed right-0 top-0 h-full z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out
    ${isMobile ? "w-[70%] sm:w-[60%] md:w-[40%] translate-x-0" : "hidden lg:block w-[20%]"}`}
>

      <div className="p-5">
        {/* Header Icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <FaPaperPlane size={20} />
            <MdNotificationsActive size={25} />
          </div>
          {isMobile && (
            <button onClick={onClose}>
              <IoMenu size={25} />
            </button>
          )}
        </div>

        {/* user profile */}
        <div className="mx-2 mt-10">
          <h1 className="my-5 text-md capitalize font-semibold">Profile</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate("/profile")}>
              <img
                src={userData.profile}
                alt="user"
                className="w-[50px] rounded-full "
              />
              <div>
                <h1 className="capitalize font-semibold text-[12px]">
                  {userData.fullname}
                </h1>
                <p className="text-xs">{userData.username}</p>
              </div>
            </div>
            <div>
              <button className="px-5 py-0.5 border-2 border-gray-300 rounded-4xl text-[12px] bg-gray-100">
                <NavLink to="/add-post">+ Add Post</NavLink>
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <Suggestion />
      </div>
    </div>
  );
};

export default RightPart;
