import React, { useEffect, useState } from "react";
import { collection, getDocs ,query ,limit } from "firebase/firestore";
import { auth, firestore } from '../../firebaseConfig';
import { NavLink, useNavigate } from "react-router-dom";

const Suggestion = () => {
  const [users, setUsers] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        return;
      }
      try {
        const usersColletion = collection(firestore,"users");
        const q = query(usersColletion,limit(8));
        const querySnapshot = await getDocs(q);
        const userArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).filter(u => u.id !== user.uid);
        setUsers(userArray);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-4 mt-8 w-full">
      <div className="mb-4 flex items-center justify-between">
      <h1 className="text-base font-semibold">Suggestions</h1>
      <p className="text-xs text-blue-500 underline cursor-pointer"><NavLink to="/all-users">Show more</NavLink></p>
      </div>

      <div className="flex flex-col gap-4">
        {users.map(item => (
          <div key={item.id} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate(`/other-profile/${item.user_id}`)}>
              <img
                src={item.profile}
                alt="profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <h2 className="font-semibold truncate text-[12px] capitalize max-w-[120px] sm:max-w-[150px]">{item.fullname}</h2>
                <p className="text-[10px] text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">{item.username}</p>
              </div>
            </div>
            <button className="px-3 py-1 text-xs  border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              + Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
