import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserContext } from "../../context/UserContext"; // adjust path as needed
import { firestore } from "../../firebaseConfig";

const AllPost = () => {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userData) return;

      try {
        const postsRef = collection(firestore, "posts");
        const q = query(postsRef, where("user_id", "==", userData.user_id)); // assuming userId is stored in each post
        const querySnapshot = await getDocs(q);

        const postList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(postList);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              <img
                src={post.post} // assuming post has imageUrl field
                alt="Post"
                className="rounded-2xl object-cover w-full h-52"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
