import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { UserContext } from "../context/UserContext";
import { firestore } from "../firebaseConfig";

const Favourites = () => {
  const { userData } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!userData?.user_id) return;

      try {
        const postsSnapshot = await getDocs(collection(firestore, "posts"));
        const likedPostsArray = [];

        for (const postDoc of postsSnapshot.docs) {
          const likesRef = collection(firestore, "posts", postDoc.id, "likes");
          const likesSnapshot = await getDocs(likesRef);

          const likedByUser = likesSnapshot.docs.some(
            (likeDoc) => likeDoc.data().usrId === userData.user_id
          );

          if (likedByUser) {
            likedPostsArray.push({ id: postDoc.id, ...postDoc.data() });
          }
        }

        setLikedPosts(likedPostsArray); //fetching fav posts
      } catch (error) {
        console.error("Error fetching favourite posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [userData]);

  if (loading) {
    return <p className="text-center">Loading favourite posts...</p>;
  }

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Favourites</h1>
      {likedPosts.length === 0 ? (
        <p>No favourites found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedPosts.map((post) => (
            <div key={post.id}>
              <img
                src={post.post}
                alt=""
                className="w-full h-52 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
