import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { firestore } from "../firebaseConfig";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        return;
      }
      try {
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(usersCollection);
        const users = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((u) => u.id !== user.uid); // Exclude current user
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">All Users</h1>
      <div className="flex flex-col gap-4">
        {allUsers.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2"
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/other-profile/${item.user_id}`)}
            >
              <img
                src={item.profile}
                alt="profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <h2 className="font-semibold truncate text-[12px] capitalize max-w-[120px] sm:max-w-[150px]">
                  {item.fullname}
                </h2>
                <p className="text-[10px] text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">
                  {item.username}
                </p>
              </div>
            </div>
            <button className="px-3 py-1 text-xs border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              + Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
