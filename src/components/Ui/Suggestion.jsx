import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {  auth, firestore } from '../../firebaseConfig';

const Suggestion = () => {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async()=>{
            const user = auth.currentUser;
            if(!user){
                console.log("User not logged in");
                return;
                
            }
            try{
                const querySnapshot = await getDocs(collection(firestore,"users"));
                const userArray = querySnapshot.docs.map(doc=>({
                    id : doc.id,
                    ...doc.data()
                })).filter(u=>u.id !== user.uid);
                setUsers(userArray);
            }catch(error){
                console.error("Error fetching users : ",error);
            }
        };
        fetchUsers();
    },[]);

  return (
   
    <div className="mx-5">
      <h1 className="mt-5 text-md capitalize font-semibold">Suggestion</h1>

      <div className="flex flex-col gap-4 py-5">
      {
        users.map(item =>(
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={item.profile}
              alt=""
              className="w-[50px] rounded-full"
            />
            <div>
              <h1 className="capitalize font-semibold text-[15px]">
                {item.fullname}
              </h1>
              <p className="text-xs">{item.username}</p>
            </div>
          </div>
          <div className="">
            <button className="px-5 py-0.5 border-2 border-gray-300 rounded-4xl text-[12px] bg-gray-100">+ Follow</button>
          </div>
        </div>
     ))
    }
      </div>
    </div>
  );
};

export default Suggestion;
