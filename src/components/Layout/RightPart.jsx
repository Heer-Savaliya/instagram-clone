import React, { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import Suggestion from "../Ui/Suggestion";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const RightPart = () => {
  const {userData ,loading} = useContext(UserContext);
  if(loading || !userData) return <p>Loading...</p>;
  return (
    <>
      <div className="w-[25%] p-5 bg-white h-[100dvh]">
        <div className="flex items-center justify-end gap-14">
          <FaPaperPlane size={20} />
          <MdNotificationsActive size={25} />
          <IoMenu size={25} />
        </div>

        {/* user profile */}
        {userData ? (
          <div className="mx-5 mt-10">
            <h1 className="my-5 text-md capitalize font-semibold">Profile</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={userData.profile}
                  alt=""
                  className="w-[50px] rounded-full"
                />
                <div>
                  <h1 className="capitalize font-semibold text-[15px]">
                    {userData.fullname}
                  </h1>
                  <p className="text-xs">{userData.username}</p>
                </div>
              </div>
              <div className="">
                <button className="px-5 py-0.5 border-2 border-gray-300 rounded-4xl text-[12px] bg-gray-100">
                  <NavLink to="/add-post"> + Add Post</NavLink>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
        <Suggestion />
      </div>
    </>
  );
};

export default RightPart;
