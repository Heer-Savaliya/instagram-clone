import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from '../../firebaseConfig';

const Suggestion = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        return;
      }
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
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
      <h1 className="text-base font-semibold mb-4">Suggestions</h1>

      <div className="flex flex-col gap-4">
        {users.map(item => (
          <div key={item.id} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img
                src={item.profile}
                alt="profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="text-sm">
                <h2 className="font-semibold truncate max-w-[120px] sm:max-w-[150px]">{item.fullname}</h2>
                <p className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">{item.username}</p>
              </div>
            </div>
            <button className="px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              + Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
