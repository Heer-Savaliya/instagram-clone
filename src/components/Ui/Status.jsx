import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const Status = () => {
  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Status</h1>
        <h3 className="text-xs p-2 border-2 border-gray-300 rounded-4xl bg-gray-100 text-gray-600">
          <IoIosArrowForward />
        </h3>
      </div>

      {/* status */}
      <div className="py-5 flex gap-4">
        <div className="text-center">
          <div className="relative inline-block p-1 bg-gradient-to-br from-pink-500 via-yellow-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            heer
          </h5>
        </div>

        <div className="text-center">
  <div className="relative inline-block p-1 bg-gradient-to-br from-pink-500 via-yellow-500 to-purple-500 rounded-full">
    <img
      src="./images/p1.jpg"
      alt=""
      className="w-[60px] rounded-full"
    />
  </div>
  <h5 className="text-xs font-semibold text-gray-600 capitalize">heer</h5>
</div>

      </div>
    </div>
  );
};

export default Status;
