import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const formData = new FormData();
      formData.append("file", addPost.post);
      formData.append("upload_preset", "myuploadpreset");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxctlq87l/image/upload", //upload to cloudinary
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      await addDoc(collection(firestore, "posts"), {
        user_id: user.uid,
        caption: addPost.caption,
        description: addPost.description,
        post: imageUrl,
        createdAt: new Date(),
      });

      toast.success("Post added");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to upload post. Please try again.");
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10">
      <ToastContainer position="top-right" />
      <div className="max-w-3xl mx-auto shadow-lg bg-white p-6 sm:p-10 rounded-lg">
        <h1 className="text-center pb-5 text-2xl font-semibold text-gray-700">
          Add Post
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="caption"
                className="text-gray-700 capitalize font-medium"
              >
                Caption
              </label>
              <input
                className="p-2 mt-1 border border-gray-300 w-full rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                type="text"
                name="caption"
                placeholder="Add caption"
                id="caption"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2">
              <label
                htmlFor="post"
                className="text-gray-700 capitalize font-medium"
              >
                Upload Image
              </label>
              <input
                className="p-2 mt-1 border border-gray-300 w-full rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                type="file"
                name="post"
                id="post"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-gray-700 capitalize font-medium"
            >
              Description
            </label>
            <textarea
              className="p-2 mt-1 border border-gray-300 w-full rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              name="description"
              placeholder="Add description"
              id="description"
              rows={4}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold hover:opacity-90 transition-all duration-200"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
