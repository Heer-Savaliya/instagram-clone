import React, { useEffect, useState } from 'react';
import {
  IoHeartOutline,
  IoShareSocialSharp,
  IoBookmarksOutline,
} from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { LuMessageCircleHeart } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { auth, firestore } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";

const FeedCard = ({ searchQuery }) => {
  const [postItems, setPostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

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

        // Fetch comments for all posts
        const commentsData = {};
for (let post of postsWithUser) {
  const commentsSnapshot = await getDocs(collection(firestore, "posts", post.id, "comments"));
  
  const commentsWithUser = await Promise.all(
    commentsSnapshot.docs.map(async (docSnap) => {
      const commentData = docSnap.data();
      let userData = { fullname: "Unknown", profile: "./images/default_p.jpg" };

      if (commentData.usrId) {
        const userDoc = await getDoc(doc(firestore, "users", commentData.usrId));
        if (userDoc.exists()) {
          const userInfo = userDoc.data();
          userData = {
            fullname: userInfo.fullname || "Unknown",
            profile: userInfo.profile || "./images/default_p.jpg",
          };
        }
      }

      return {
        id: docSnap.id,
        ...commentData,
        user: userData,
      };
    })
  );

  commentsData[post.id] = commentsWithUser;
}
setComments(commentsData);


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

  const sortedPost = Array.isArray(postItems)
    ? [...postItems].sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.seconds - a.createdAt.seconds;
      })
    : [];

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
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(firestore, "posts", item.id, "likes", docSnap.id));
      });

      setPostItems(prev =>
        prev.map(post =>
          post.id === item.id
            ? { ...post, likesCount: post.likesCount - 1, likedByCurrentUser: false }
            : post
        )
      );
      console.log("Post unliked");
    } else {
      await addDoc(likeRef, {
        usrId: user.uid,
        likedAt: new Date(),
      });

      setPostItems(prev =>
        prev.map(post =>
          post.id === item.id
            ? { ...post, likesCount: post.likesCount + 1, likedByCurrentUser: true }
            : post
        )
      );
      console.log("Post liked");
    }
  };

  const handleCommentChange = (postId, value) => {
    setNewComment(prev => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    const user = auth.currentUser;
    if (!user || !newComment[postId]) return;

    try {
      const commentRef = collection(firestore, "posts", postId, "comments");
      await addDoc(commentRef, {
        usrId: user.uid,
        comment: newComment[postId],
        commentedAt: new Date(),
      });

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
let userData = { fullname: "Unknown", profile: "./images/default_p.jpg" };
if (userDoc.exists()) {
  const userInfo = userDoc.data();
  userData = {
    fullname: userInfo.fullname || "Unknown",
    profile: userInfo.profile || "./images/default_p.jpg",
  };
}

setComments(prev => ({
  ...prev,
  [postId]: [
    ...(prev[postId] || []),
    {
      usrId: user.uid,
      comment: newComment[postId],
      user: userData,
    }
  ],
}));


      setNewComment(prev => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <>
      {filteredPosts.map(item => (
        <div
          key={item.id}
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)" }}
          className="w-full bg-white rounded-[8px] p-5 flex gap-4 flex-col mb-6"
        >
          {/* Profile */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <img src={item.user.profile} alt="" className="w-[45px] rounded-full" />
              <div>
                <h2 className="text-[16px] font-semibold capitalize">{item.user.fullname}</h2>
                <p className="text-[13px] capitalize text-gray-500 font-medium">{item.caption}</p>
              </div>
            </div>
            <BsThreeDots size={20} />
          </div>

          {/* Feed Image */}
          <div>
            <img src={item.post} alt="" className="rounded-[7px] w-full" />
          </div>

          {/* Likes */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600 ">
              {item.likedByCurrentUser ? (
                <GoHeartFill className="text-xl cursor-pointer text-red-500" onClick={() => addToLike(item)} />
              ) : (
                <IoHeartOutline className="text-xl cursor-pointer text-gray-500" onClick={() => addToLike(item)} />
              )}
              <p className="text-[16px] font-medium">
                <span className="font-bold">{item.likesCount}</span> Likes
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <LuMessageCircleHeart className="text-xl" />
              <p className="text-[16px] font-medium">
                <span className="font-bold">{comments[item.id]?.length || 0}</span> Comments
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoShareSocialSharp className="text-xl" />
              <p className="text-[16px] font-medium">24 Shares</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <IoBookmarksOutline className="text-xl" />
              <p className="text-[16px] font-medium">24 Save</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-500 ">{item.description}</p>
          </div>

          {/* Comment Section */}
          <div className="mt-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Comments:</h3>
            {comments[item.id]?.map((cmt, idx) => (
  <div key={idx} className="flex items-center gap-2 mb-2">
    <img src={cmt.user.profile} alt="profile" className="w-6 h-6 rounded-full" />
    <span className="font-semibold text-sm capitalize">{cmt.user.fullname} : </span>
    <p className="text-gray-600 text-sm">{cmt.comment}</p>
  </div>
))}

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={newComment[item.id] || ""}
                onChange={(e) => handleCommentChange(item.id, e.target.value)}
                placeholder="Write a comment..."
                className="border rounded px-3 py-1 w-full text-sm"
              />
              <button
                onClick={() => handleAddComment(item.id)}
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedCard;
