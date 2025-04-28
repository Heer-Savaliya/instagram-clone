import React, { useEffect, useState } from 'react'
import { IoHeartOutline ,IoShareSocialSharp ,IoBookmarksOutline } from "react-icons/io5";
import { LuMessageCircleHeart } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { collection, getDoc ,doc, getDocs } from "firebase/firestore";
import {  auth,firestore } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";

const FeedCard = () => {
  // const [postItems,setPostItems] =useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const user = auth.currentUser;
  //     if (!user) {
  //       console.error("User is not authenticated.");
  //       return;
  //     }
  
  //     try {
  //       const querySnapshot = await getDocs(collection(firestore, "posts"));
  //       if (querySnapshot.empty) {
  //         console.log("No posts found in Firestore");
  //       }
  //       const postsWithUser = await Promise.all(
  //         querySnapshot.docs.map(async (docSnap) => {
  //           const postData = docSnap.data();
  //           let userData = { fullname: "Unknown", profilePic: "./images/p1.jpg" };
  
  //           if (postData.user_id) {
  //             const userDoc = await getDoc(doc(firestore, "users", postData.user_id));
  //             if (userDoc.exists()) {
  //               const userInfo = userDoc.data();
  //               userData = {
  //                 fullname: userInfo.fullname || "Unknown",
  //                 profilePic: userInfo.profileImage || "./images/p1.jpg",
  //               };
  //             }
  //           }
  
  //           return {
  //             id: docSnap.id,
  //             ...postData,
  //             user: userData,
  //           };
  //         })
  //       );
  //       setPostItems(postsWithUser);
  //     } catch (error) {
  //       console.error("Error fetching the posts:", error);
  //     }
  //   };
  
  //   fetchPosts();
  // }, []);

  const [postItems, setPostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      // Check if the user is logged in
      if (!user) {
        console.log("User is not authenticated.");
        setLoading(false);
        return; 
      }

      try {
        // Fetch posts from Firestore
        const querySnapshot = await getDocs(collection(firestore, "posts"));
        if (querySnapshot.empty) {
          console.log("No posts found in Firestore");
        } else {
          const postsWithUser = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const postData = docSnap.data();
              let userData = { fullname: "Unknown", profile: "./images/p1.jpg" };

              if (postData.user_id) {
                const userDoc = await getDoc(doc(firestore, "users", postData.user_id));
                if (userDoc.exists()) {
                  const userInfo = userDoc.data();
                  userData = {
                    fullname: userInfo.fullname || "Unknown",
                    profile: userInfo.profile || "./images/p1.jpg",
                  };
                }
              }

              return {
                id: docSnap.id,
                ...postData,
                user: userData,
              };
            })
          );
          setPostItems(postsWithUser);
        }
      } catch (error) {
        console.error("Error fetching the posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  
  return (
    <>

    {postItems.map(item =>(

    
      <div key={item.id}
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
          }}
          className="w-full bg-white rounded-[8px] p-5 flex gap-4 flex-col"
        >
          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <img
                src={item.user.profile}
                alt=""
                className="w-[45px] rounded-full"
              />
              <div>
                <h2 className="text-[16px] font-semibold capitalize">
                  {item.user.fullname}
                </h2>
                <p className="text-[13px] capitalize text-gray-500 font-medium">
                  {item.caption}
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
              src={item.post}
              alt=""
              className="rounded-[7px] w-full"
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
            <p className="text-gray-500 ">{item.description}</p>
          </div>
        </div>
))}
       
    </>
  )
}

export default FeedCard
