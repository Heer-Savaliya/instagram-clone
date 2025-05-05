import { collection, doc, getDocs, query ,where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../firebaseConfig';

const ParticularUserPost = ({userData}) => {
    const [loading, setLoading] = useState(true);
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const fetchUserPosts = async ()=>{
            if(!userData) return;

            try{
                const postRef = collection(firestore,"posts");
                const q = query(postRef,where("user_id","==",userData.user_id));
                const querySnapshot = await getDocs(q);

                const postList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postList);
            }catch(error){
                console.error("Error fetching other user posts : ",error);
            }finally{
                setLoading(false);
        }
        }
        fetchUserPosts();
    },[userData]);

    if (loading) {
        return <p className="text-center">Loading posts...</p>;
      }
    
  return (
    <div>

<h1 className="text-xl font-bold mb-4">Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className=" rounded-2xl">
              <img
                src={post.post}
                alt="Post"
                className="rounded-2xl object-cover w-full h-52 transition-transform duration-300 group-hover:scale-105"
              />
              </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ParticularUserPost
