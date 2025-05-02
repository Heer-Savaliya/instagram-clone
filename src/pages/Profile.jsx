import React, { useContext } from "react";
import { LuGrid2X2Check } from "react-icons/lu";
import { IoBookmarksOutline } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { PiVideoLight } from "react-icons/pi";
import AllPost from "../components/Ui/AllPost";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";


const Profile = () => {
    const { userData, loading } = useContext(UserContext);
    const [postCount, setPostCount] = useState(0);


  if (loading || !userData) return <p>Loading profile...</p>;
  useEffect(() => {
    const fetchPostCount = async () => {
      if (!userData || !userData.user_id) return;
  
      try {
        const q = query(
          collection(firestore, "posts"),
          where("user_id", "==", userData.user_id)
        );
        const snapshot = await getDocs(q);
        setPostCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };
  
    fetchPostCount();
  }, [userData]);
  
  return (
    <div>
      <div className="flex  items-center gap-10">
        <div>
          <img
            src={userData.profile}
            alt=""
            className="w-[170px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-[300px] ">
          <div>
            <h1 className="font-semibold text-xl capitalize">{userData.fullname}</h1>
            <p className="italic text-gray-600">{userData.username}</p>
          </div>
          <div className="flex items-center justify-between text-center ">
            <div>
              <h1 className="font-semibold">Posts</h1>
              <p className="text-gray-600 ">{postCount}</p>
            </div>
            <div>
              <h1 className="font-semibold">Followers</h1>
              <p className="text-gray-600">137</p>
            </div>
            <div>
              <h1 className="font-semibold">Following</h1>
              <p className="text-gray-600">284</p>
            </div>
          </div>
        <div className="flex items-center justify-between gap-6">
            <button className="border-2 py-1 border-gray-300 w-full rounded-[10px] text-[12px]">Edit Profile</button>
            <button className="border-2 py-1 border-gray-300 w-full rounded-[10px] text-[12px]">Share Profile</button>
        </div>
        </div>
      </div>

      {/* grid */}
      <div className="mt-7">
        <div className="flex items-center justify-center gap-10 font-bold text-6xl">
            <hr className="w-full text-gray-400"/>
        <LuGrid2X2Check />
        <IoBookmarksOutline />
        <PiVideoLight />
        <hr className="w-full text-gray-400"/>
        </div>
      </div>

      <AllPost />
    </div>
  );
};

export default Profile;
