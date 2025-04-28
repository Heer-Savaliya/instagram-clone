import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddPost = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [addPost, setAddPost] = useState({
    caption: "",
    post: "", // This will now be a URL (string)
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "post") {
      // Handling the image URL input separately (no file upload logic here)
      setAddPost({
        ...addPost,
        post: e.target.value, // Directly set the URL
      });
    } else {
      // For text inputs (caption, description)
      setAddPost({
        ...addPost,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the URL is not empty
    if (!addPost.post) {
      setError("Please provide an image URL!");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      setError("User not logged in!");
      return;
    }

    try {
      // Store post details in Firestore, including the image URL
      await addDoc(collection(firestore, "users", user.uid, "posts"), {
        caption: addPost.caption,
        description: addPost.description,
        post: addPost.post, // Directly save the image URL here
        createdAt: new Date(),
      });

      navigate("/"); // Navigate to the home page or another page after the post is added
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
              <label
                htmlFor="caption"
                className="text-gray-700 capitalize font-serif"
              >
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
              <label
                htmlFor="post"
                className="text-gray-700 capitalize font-serif"
              >
                Image URL:{" "}
              </label>
              <input
                className="p-2 mt-1 border-2 w-full text-gray-500 border-gray-400 rounded-lg capitalize"
                type="text"
                name="post"
                placeholder="Enter image URL"
                id="post"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-1/2">
            <label
              htmlFor="description"
              className="text-gray-700 capitalize font-serif"
            >
              Description:{" "}
            </label>
            <textarea
              className="p-2 mt-1 border-2 w-full  border-gray-400 rounded-lg capitalize"
              type="text"
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
