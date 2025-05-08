import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { LuGrid2X2Check } from "react-icons/lu";
import { IoBookmarksOutline } from "react-icons/io5";
import { PiVideoLight } from "react-icons/pi";
import ParticularUserPost from "../components/Ui/ParticularUserPost";

const OtherUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(firestore, "users", id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

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
    <div className="px-4 sm:px-8 py-4">
      {userData ? (
        <>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            <div>
              <img
                src={userData.profile}
                alt="profile"
                className="w-[120px] sm:w-[170px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-[300px]">
              <div className="text-center sm:text-left">
                <h1 className="font-semibold text-xl capitalize">
                  {userData.fullname}
                </h1>
                <p className="italic text-gray-600">{userData.username}</p>
              </div>
              <div className="flex items-center justify-between text-center">
                <div>
                  <h1 className="font-semibold text-[13px] md:text-base">Posts</h1>
                  <p className="text-gray-600 text-xs">{postCount}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-[13px] md:text-base">Followers</h1>
                  <p className="text-gray-600 text-xs">137</p>
                </div>
                <div>
                  <h1 className="font-semibold text-[13px] md:text-base">Following</h1>
                  <p className="text-gray-600 text-xs">284</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <button className="border-2 py-1 border-gray-300 w-full rounded-[10px] text-[12px]">
                  + Follow
                </button>
                <button className="border-2 py-1 border-gray-300 w-full rounded-[10px] text-[12px]">
                  Share Profile
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-center gap-5 sm:gap-10 text-gray-600 text-4xl sm:text-6xl font-bold">
              <hr className="w-full text-gray-400" />
              <LuGrid2X2Check />
              <IoBookmarksOutline />
              <PiVideoLight />
              <hr className="w-full text-gray-400" />
            </div>
          </div>

          <div className="mt-6">
            <ParticularUserPost userData={userData} />
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default OtherUser;
