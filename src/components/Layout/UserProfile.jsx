import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";


const UserProfile = () => {
    const navigate = useNavigate();
  const {userData ,loading} =useContext(UserContext);
   const [postCount, setPostCount] = useState(0);

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

  if(loading || !userData ) return <p>Loading profile...</p>;
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      {userData ? (
        <>
          <div>
            <img
            onClick={()=>navigate("/profile")}
              src={userData.profile}
              alt=""
              className="w-[80px] rounded-full cursor-pointer"
            />
          </div>
          <div className="text-center">
            <h3 className="text-[15px] font-semibold capitalize">{userData.fullname}</h3>
            <p className="text-xs font-semibold text-gray-600">{userData.username}</p>
          </div>
          <div className="flex items-center gap-5 text-center text-xs">
            <div>
              <h1 className="font-semibold">Posts</h1>
              <p className="text-gray-600">{postCount}</p>
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
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default UserProfile;
