import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";
import { MdNotificationsActive } from "react-icons/md";
import Suggestion from "../Ui/Suggestion";
import { auth, firestore } from "../../firebaseConfig";

const RightPart = () => {
  const [userData ,setUserData]=useState(null);
  useEffect(()=>{
    const userInfo = async ()=>{
      try{
        const user = auth.currentUser;
        if(user){
          const userRef = doc(firestore,"users",user.user_id);
          const userSnap = await GiPschentDoubleCrown(userRef);
          if (userSnap.exists()){
            setUserData(userSnap.data());
          }else{
            console.log("No such user data");
          }
        }
      }catch(error){
        console.error("Error fetching logged in user : ",error);
        
      }
    }
    userInfo();
  },[])
  return (
    <>
      <div className="w-[25%] p-5 bg-white h-[100dvh]">
        <div className="flex items-center justify-end gap-14">
          <FaPaperPlane size={20} />
          <MdNotificationsActive size={25} />
          <IoMenu size={25} />
        </div>

      {/* user profile */}
      {userData ? (

      
      <div className="mx-5 mt-10">

      <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={userData.profile}
              alt=""
              className="w-[50px] rounded-full"
            />
            <div>
              <h1 className="capitalize font-semibold text-[15px]">
                {userData.fullname}
              </h1>
              <p className="text-xs">{userData.username}</p>
            </div>
          </div>
          <div className="">
            <button className="px-5 py-0.5 border-2 border-gray-300 rounded-4xl text-[12px] bg-gray-100">+ Follow</button>
          </div>
        </div>
      </div>

): (
  <p>loading</p>
)}
        <Suggestion/>
      </div>
    </>
  );
};

export default RightPart;
