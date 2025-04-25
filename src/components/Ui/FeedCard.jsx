import React from 'react'
import { IoHeartOutline ,IoShareSocialSharp ,IoBookmarksOutline } from "react-icons/io5";
import { LuMessageCircleHeart } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";


const FeedCard = () => {
  return (
    <>
      <div
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
          }}
          className="w-full bg-white rounded-[8px] p-5 flex gap-4 flex-col"
        >
          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <img
                src="./images/p1.jpg"
                alt=""
                className="w-[45px] rounded-full"
              />
              <div>
                <h2 className="text-[16px] font-semibold capitalize">
                  Heer Savaliya
                </h2>
                <p className="text-[13px] capitalize text-gray-500 font-medium">
                  lo ncdj
                </p>
              </div>
            </div>
            <div>
              <BsThreeDots size={20} />
            </div>
          </div>

          {/* feed image */}

          <div>
            <img
              src="./images/feed10.jpg"
              alt=""
              className="rounded-[7px]"
            />
          </div>

          {/* Likes */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 ">
              <IoHeartOutline className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Likes
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <LuMessageCircleHeart className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Comments
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoShareSocialSharp className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Shares
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoBookmarksOutline className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Save
              </p>
            </div>
          </div>

          {/* description */}
          <div>
            <p className="text-gray-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore repellat, fugiat reiciendis unde modi voluptas dolores sapiente ad harum!</p>
          </div>
        </div>

        <div
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
          }}
          className="w-full bg-white rounded-[8px] p-5 flex gap-4 flex-col"
        >
          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <img
                src="./images/p1.jpg"
                alt=""
                className="w-[45px] rounded-full"
              />
              <div>
                <h2 className="text-[16px] font-semibold capitalize">
                  Heer Savaliya
                </h2>
                <p className="text-[13px] capitalize text-gray-500 font-medium">
                  lo ncdj
                </p>
              </div>
            </div>
            <div>
              <BsThreeDots size={20} />
            </div>
          </div>

          {/* feed image */}

          <div>
            <img
              src="./images/feed10.jpg"
              alt=""
              className="rounded-[7px]"
            />
          </div>

          {/* Likes */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 ">
              <IoHeartOutline className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Likes
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <LuMessageCircleHeart className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Comments
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoShareSocialSharp className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Shares
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoBookmarksOutline className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">24</span> Save
              </p>
            </div>
          </div>

          {/* description */}
          <div>
            <p className="text-gray-500 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore repellat, fugiat reiciendis unde modi voluptas dolores sapiente ad harum!</p>
          </div>
        </div>
    </>
  )
}

export default FeedCard
