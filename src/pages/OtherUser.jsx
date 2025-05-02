import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

const OtherUser = () => {
  const { id } = useParams(); // ✅ FIXED here
  const [userData, setUserData] = useState(null);

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


  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-2">User Profile</h1>
      {userData ? (
        <>
          <p><strong>Name:</strong> {userData.fullname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default OtherUser;
