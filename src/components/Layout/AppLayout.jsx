import React from 'react'
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import Navigation from './Navigation';
import CenterPart from './CenterPart';


const AppLayout = () => {
    return (
        <div className="w-full bg-white">
          <div className="flex items-center justify-between">
            {/* Left Section - 1/3 Width */}
            <Navigation />
    
            {/* Center Section - 1/3 Width */}
            <CenterPart />
    
            {/* Right Section - 1/3 Width */}
            <div className="w-[25%] flex items-center justify-end gap-6">
              <FaPaperPlane size={20} />
              <MdNotificationsActive size={25} />
              <IoMenu size={25} />
            </div>
          </div>
        </div>
      );
}

export default AppLayout
