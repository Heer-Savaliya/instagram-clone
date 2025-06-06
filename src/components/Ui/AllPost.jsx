import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { UserContext } from "../../context/UserContext"; // adjust path as needed
import { firestore } from "../../firebaseConfig";
import { MdAutoDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllPost = () => {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userData) return;

      try {
        const postsRef = collection(firestore, "posts");
        const q = query(postsRef, where("user_id", "==", userData.user_id));
        const querySnapshot = await getDocs(q);

        const postList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postList);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        toast.error("Error fetching user posts:", error, {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(firestore, "posts", postId));
      setPosts((prev) => prev.filter((posts) => posts.id !== postId));
      toast.success("Deleted");
    } catch (error) {
      toast.error("Error while deleteting post", error, {
        position: "top-right",
      });
      console.error("Error while deleteting post : ", error);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <h1 className="text-xl font-bold mb-4">Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img
                src={post.post}
                alt="Post"
                className="rounded-2xl object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={() => handleDelete(post.id)}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center gap-2 justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MdAutoDelete />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
