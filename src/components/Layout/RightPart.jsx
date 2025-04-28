import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import Suggestion from "../Ui/Suggestion";

const RightPart = () => {
  return (
    <>
      <div className="w-[25%] p-5 bg-white h-[100dvh]">
        <div className="flex items-center justify-end gap-14">
          <FaPaperPlane size={20} />
          <MdNotificationsActive size={25} />
          <IoMenu size={25} />
        </div>


        <Suggestion />
      </div>
    </>
  );
};

export default RightPart;
