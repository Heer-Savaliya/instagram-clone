import React from 'react'
import Navigation from './Navigation';
import CenterPart from './CenterPart';
import RightPart from './RightPart';


const AppLayout = () => {
    return (
        <div className="w-full bg-white">
          <div className="flex items-center justify-between h-screen overflow-hidden">
            {/* Left Section - 1/3 Width */}
            <Navigation />
    
            {/* Center Section - 1/3 Width */}
            <CenterPart />
    
            {/* Right Section - 1/3 Width */}
           <RightPart />
          </div>
        </div>
      );
}

export default AppLayout
