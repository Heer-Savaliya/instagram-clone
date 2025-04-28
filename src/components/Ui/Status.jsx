import React, { useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Status = () => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Status</h1>
        <button
          onClick={scrollRight}
          className="text-xs p-2 border-2 border-gray-300 rounded-full bg-gray-100 text-gray-600"
        >
          {/* arrow */}
          <IoIosArrowForward />
        </button>
      </div>

      {/* Status */}
      <div
        ref={scrollRef}
        className="py-5 flex gap-4 overflow-x-auto scrollbar-hide"
      >
        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Heer
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p3.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Henu
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Heer
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p3.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Henu
          </h5>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Heer
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p3.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Henu
          </h5>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Heer
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p3.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Henu
          </h5>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p1.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Heer
          </h5>
        </div>

        <div className="text-center flex-shrink-0">
          <div className="relative inline-block p-[3px] bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full">
            <img
              src="./images/p3.jpg"
              alt=""
              className="w-[60px] rounded-full"
            />
          </div>
          <h5 className="text-xs font-semibold text-gray-600 capitalize">
            Henu
          </h5>
        </div>  

        {/* Add more statuses here if you want */}
      </div>
    </div>
  );
};

export default Status;
