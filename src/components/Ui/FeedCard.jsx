import React, { useEffect, useState } from 'react'
import { IoHeartOutline ,IoShareSocialSharp ,IoBookmarksOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { LuMessageCircleHeart } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { collection, getDoc ,doc, getDocs ,addDoc} from "firebase/firestore";
import {  auth,firestore } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { query, where, deleteDoc } from "firebase/firestore";

const FeedCard = ({searchQuery}) => {

  const [postItems, setPostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        console.log("User not authenticated.");
        setLoading(false);
        return;
      }
  
      try {
        const querySnapshot = await getDocs(collection(firestore, "posts"));
  
        const postsWithUser = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const postData = docSnap.data();
            let userData = { fullname: "Unknown", profile: "./images/default_p.jpg" };
            let likedByCurrentUser = false;
  
            // Fetch user data
            if (postData.user_id) {
              const userDoc = await getDoc(doc(firestore, "users", postData.user_id));
              if (userDoc.exists()) {
                const userInfo = userDoc.data();
                userData = {
                  fullname: userInfo.fullname || "Unknown",
                  profile: userInfo.profile || "./images/default_p.jpg",
                };
              }
            }
  
            // Check if the current user liked this post
            const likeSnapshot = await getDocs(collection(firestore, "posts", docSnap.id, "likes"));
            likeSnapshot.forEach(doc => {
              if (doc.data().usrId === user.uid) {
                likedByCurrentUser = true;
              }
            });
  
            return {
              id: docSnap.id,
              ...postData,
              user: userData,
              likesCount: likeSnapshot.size,
              likedByCurrentUser,
            };
          })
        );
  
        setPostItems(postsWithUser);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  
  
  if (loading) {
    return <div>Loading posts...</div>;
  }
  
  // sorting
  const sortedPost = Array.isArray(postItems) ?
  [...postItems].sort((a,b)=>{
    if(!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.seconds - a.createdAt.seconds;
  }) : [];
  

  const filteredPosts = sortedPost.filter((post) =>
    post.user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

const addToLike = async (item) => {
  const user = auth.currentUser;
  if (!user) {
    console.log("Please log in to like the post");
    return;
  }

  const likeRef = collection(firestore, "posts", item.id, "likes");
  const q = query(likeRef, where("usrId", "==", user.uid));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    // User already liked → UNLIKE
    snapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(firestore, "posts", item.id, "likes", docSnap.id));
    });

    setPostItems(prev =>
      prev.map(post =>
        post.id === item.id
          ? {
              ...post,
              likesCount: post.likesCount - 1,
              likedByCurrentUser: false,
            }
          : post
      )
    );
    console.log("Post unliked");
  } else {
    // User hasn't liked → LIKE
    await addDoc(likeRef, {
      usrId: user.uid,
      likedAt: new Date(),
    });

    setPostItems(prev =>
      prev.map(post =>
        post.id === item.id
          ? {
              ...post,
              likesCount: post.likesCount + 1,
              likedByCurrentUser: true,
            }
          : post
      )
    );
    console.log("Post liked");
  }
};




  return (
    <>

    {filteredPosts.map(item =>(

    
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
              {item.likedByCurrentUser ?
              <GoHeartFill className={"text-xl cursor-pointer text-red-500"} onClick={()=>addToLike(item)}/>
              :
              <IoHeartOutline className={"text-xl cursor-pointer text-gray-500"} onClick={()=>addToLike(item)}/>
            }
              <p className="text-[16px] font-medium">
                <span className="font-bold">{item.likesCount}</span> Likes
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
