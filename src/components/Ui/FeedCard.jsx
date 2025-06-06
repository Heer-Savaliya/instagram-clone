import React, { useEffect, useState } from "react";
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
import { auth, firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ searchQuery }) => {
  const [postItems, setPostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const postDocs = await getDocs(collection(firestore, "posts"));
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userIds = [
          ...new Set(posts.map((p) => p.user_id).filter(Boolean)),
        ];
        const userFetches = await Promise.all(
          userIds.map((uid) => getDoc(doc(firestore, "users", uid)))
        );

        const userMap = {};
        userFetches.forEach((docSnap, idx) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            userMap[userIds[idx]] = {
              fullname: data.fullname || "Unknown",
              profile: data.profile || "./images/default_p.jpg",
            };
          }
        });

        const updatedPosts = await Promise.all(
          posts.map(async (post) => {
            const likesRef = collection(firestore, "posts", post.id, "likes");
            const likesSnap = await getDocs(likesRef);
            const likesCount = likesSnap.size;
            const likedByCurrentUser = likesSnap.docs.some(
              (like) => like.data().usrId === user.uid
            );

            return {
              ...post,
              user: userMap[post.user_id] || {
                fullname: "Unknown",
                profile: "./images/default_p.jpg",
              },
              likesCount,
              likedByCurrentUser,
            };
          })
        );

        setPostItems(updatedPosts);

        const commentFetches = await Promise.all(
          updatedPosts.map(async (post) => {
            const commentSnap = await getDocs(
              collection(firestore, "posts", post.id, "comments")
            );
            const commentData = await Promise.all(
              commentSnap.docs.map(async (docSnap) => {
                const data = docSnap.data();
                let userData = {
                  fullname: "Unknown",
                  profile: "./images/default_p.jpg",
                };
                if (data.usrId) {
                  const uDoc = await getDoc(
                    doc(firestore, "users", data.usrId)
                  );
                  if (uDoc.exists()) {
                    const uInfo = uDoc.data();
                    userData = {
                      fullname: uInfo.fullname || "Unknown",
                      profile: uInfo.profile || "./images/default_p.jpg",
                    };
                  }
                }
                return { ...data, user: userData };
              })
            );
            return [post.id, commentData];
          })
        );

        const commentsMap = Object.fromEntries(commentFetches);
        setComments(commentsMap);
      } catch (err) {
        console.error(err);
        toast.error("Error loading feed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const sortedPosts = postItems
    .filter((post) => {
      return (
        post.user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

  const addToLike = async (item) => {
    const user = auth.currentUser;
    if (!user) return toast.warn("Please log in to like the post");

    const likeRef = collection(firestore, "posts", item.id, "likes");
    const q = query(likeRef, where("usrId", "==", user.uid));
    const snap = await getDocs(q);

    if (!snap.empty) {
      for (let d of snap.docs) {
        await deleteDoc(doc(firestore, "posts", item.id, "likes", d.id));
      }
      updatePost(item.id, -1, false);
      toast.success("Post unliked");
    } else {
      await addDoc(likeRef, { usrId: user.uid, likedAt: new Date() });
      updatePost(item.id, 1, true);
      toast.success("Post liked");
    }
  };

  const updatePost = (postId, delta, liked) => {
    setPostItems((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likesCount: p.likesCount + delta,
              likedByCurrentUser: liked,
            }
          : p
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleAddComment = async (postId) => {
    const user = auth.currentUser;
    const text = newComment[postId];
    if (!user || !text) return;

    const commentRef = collection(firestore, "posts", postId, "comments");
    await addDoc(commentRef, {
      usrId: user.uid,
      comment: text,
      commentedAt: new Date(),
    });

    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    let userInfo = {
      fullname: "Unknown",
      profile: "./images/default_p.jpg",
    };
    if (userDoc.exists()) {
      const data = userDoc.data();
      userInfo = {
        fullname: data.fullname || "Unknown",
        profile: data.profile || "./images/default_p.jpg",
      };
    }

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { comment: text, user: userInfo }],
    }));

    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <>
      <ToastContainer position="top-right" />
      {sortedPosts.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-[auto] mx-auto bg- rounded-[8px] p-2 lg:p-6 flex flex-col gap-4 mb-6 shadow-md"
        >
          {/* Profile */}
          <div className="flex justify-between items-center flex-wrap gap-y-2">
            <div
              className="flex gap-4 items-center cursor-pointer"
              onClick={() => {
                const currentUser = auth.currentUser;
                if (currentUser && currentUser.uid === item.user_id) {
                  navigate("/profile");
                } else {
                  navigate(`/other-profile/${item.user_id}`);
                }
              }}
            >
              <img
                src={item.user.profile}
                alt=""
                className="w-10 h-10 rounded-full object-cover "
              />
              <div>
                <h2 className="text-[15px] sm:text-[16px] font-semibold capitalize">
                  {item.user.fullname}
                </h2>
                <p className="text-[12px] sm:text-[13px] text-gray-500 capitalize">
                  {item.caption}
                </p>
              </div>
            </div>
            <BsThreeDots size={20} />
          </div>

          {/* Feed Image */}
          <div>
            <img
              src={item.post}
              alt=""
              className="w-full h-auto rounded-[7px] object-cover"
            />
          </div>

          {/* Reactions */}
          <div className="flex flex-wrap justify-between items-center gap-3 text-gray-600">
            <div className="flex items-center gap-2">
              {item.likedByCurrentUser ? (
                <GoHeartFill
                  className="text-xl cursor-pointer text-red-500"
                  onClick={() => addToLike(item)}
                />
              ) : (
                <IoHeartOutline
                  className="text-xl cursor-pointer text-gray-500"
                  onClick={() => addToLike(item)}
                />
              )}
              <p className="hidden sm:block text-[15px] sm:text-[16px] font-medium">
                <span className="font-bold">{item.likesCount}</span> Likes
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LuMessageCircleHeart
                className="text-xl cursor-pointer"
                onClick={() => toggleComments(item.id)}
              />
              <p className="hidden sm:block text-[15px] sm:text-[16px] font-medium">
                <span className="font-bold">
                  {comments[item.id]?.length || 0}
                </span>{" "}
                Comments
              </p>
            </div>

            <div className="flex items-center gap-2">
              <IoShareSocialSharp className="text-xl" />
              <p className="hidden sm:block text-[15px] sm:text-[16px] font-medium">
                24 Shares
              </p>
            </div>

            <div className="flex items-center gap-2">
              <IoBookmarksOutline className="text-xl" />
              <p className="hidden sm:block text-[15px] sm:text-[16px] font-medium">
                24 Save
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs lg:text-sm text-gray-600">{item.description}</p>

          {/* Comment Section */}
          {visibleComments[item.id] && (
            <div className="mt-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Comments:
              </h3>
              {comments[item.id]?.map((cmt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 mb-2 flex-wrap"
                >
                  <img
                    src={cmt.user.profile}
                    alt="profile"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-semibold text-sm capitalize">
                    {cmt.user.fullname}:
                  </span>
                  <p className="text-gray-600 text-sm">{cmt.comment}</p>
                </div>
              ))}

              <div className="mt-2 flex gap-2 flex-wrap sm:flex-nowrap">
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
          )}
        </div>
      ))}
    </>
  );
};

export default FeedCard;
