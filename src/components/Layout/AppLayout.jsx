import React, { useState } from 'react';
import Navigation from './Navigation';
import CenterPart from './CenterPart';
import RightPart from './RightPart';
import { IoMenu } from 'react-icons/io5';

const AppLayout = () => {
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <div className="w-full bg-white relative">
      {/* Mobile Top Menu Icon */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsRightOpen(true)}
          className="bg-gray-100 p-2 rounded-full shadow"
        >
          <IoMenu size={25} />
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Left Section */}
        <Navigation />

        {/* Center Section */}
        <CenterPart />

        {/* Right Section (Desktop only) */}
        <div className="hidden lg:block w-[25%]">
          <RightPart />
        </div>
      </div>

      {/* Right Section (Mobile Overlay) */}
      {isRightOpen && (
        <RightPart isMobile={true} onClose={() => setIsRightOpen(false)} />
      )}
    </div>
  );
};

export default AppLayout;
