import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import { addDoc, collection ,doc } from "firebase/firestore";
import axios from "axios"; 

const AddPost = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [addPost, setAddPost] = useState({
    caption: "",
    post: null, 
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "post") {
      setAddPost({
        ...addPost,
        post: e.target.files[0],
      });
    } else {
      setAddPost({
        ...addPost,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addPost.post) {
      setError("Please upload an image!");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      setError("User not logged in!");
      return;
    }

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", addPost.post);
      formData.append("upload_preset", "myuploadpreset"); // Replace with your Cloudinary preset name

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxctlq87l/image/upload", // Replace 'your_cloud_name'
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      const postsCollection = collection(firestore, "posts");

    await addDoc(postsCollection, {
      user_id: user.uid, // store user's ID
      caption: addPost.caption,
      description: addPost.description,
      post: imageUrl,
      createdAt: new Date(),
    });


      navigate("/"); // Navigate after success
    } catch (err) {
      console.error(err);
      setError("Failed to upload post. Please try again.");
    }
  };

  return (
    <div>
      <div className="shadow-2xl py-10 px-15">
        <h1 className="text-center pb-5 text-2xl">Add post</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-6 items-center">
            <div className="flex-1/2">
              <label htmlFor="caption" className="text-gray-700 capitalize font-serif">
                Caption:{" "}
              </label>
              <input
                className="p-2 mt-1 border-2 w-full border-gray-400 rounded-lg capitalize"
                type="text"
                name="caption"
                placeholder="Add caption"
                id="caption"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1/2">
              <label htmlFor="post" className="text-gray-700 capitalize font-serif">
                Upload Image:{" "}
              </label>
              <input
                className="p-2 mt-1 border-2 w-full text-gray-500 border-gray-400 rounded-lg capitalize"
                type="file"
                name="post"
                id="post"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-1/2">
            <label htmlFor="description" className="text-gray-700 capitalize font-serif">
              Description:{" "}
            </label>
            <textarea
              className="p-2 mt-1 border-2 w-full border-gray-400 rounded-lg capitalize"
              name="description"
              placeholder="Add description"
              id="description"
              rows={5}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full cursor-pointer p-3 mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold shimmer-hover"
          >
            Add post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
