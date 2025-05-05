import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { ToastContainer } from 'react-toastify';

const UpdatePassword = () => {
    const {userData,loading} =useContext(UserContext);
    return (
        <div className="px-4 sm:px-6 md:px-10 py-10">
          <ToastContainer position="top-right" />
          <div className="max-w-3xl mx-auto shadow-lg bg-white p-6 sm:p-10 rounded-lg">
            <h1 className="text-center pb-5 text-2xl font-semibold text-gray-700">Edit Profile</h1>
    
            <form className="flex flex-col gap-6" 
            // onSubmit={handleSubmit}
            >
              <div>
                <img src={userData.profile} className="w-[100px] mx-auto rounded-full" alt="" />
              </div>
    
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <label className="text-gray-700 capitalize font-medium">Full Name</label>
                  <input
                    className="p-2 mt-1 border border-gray-300 w-full rounded-md"
                    type="text"
                    name="fullname"
                    value={userData.fullname}
                    // onChange={handleChange}
                  />
                </div>
    
                <div className="w-full md:w-1/2">
                  <label className="text-gray-700 capitalize font-medium">User Name</label>
                  <input
                    className="p-2 mt-1 border border-gray-300 w-full rounded-md"
                    type="text"
                    name="username"
                    value={userData.username}
                    // onChange={handleChange}
                  />
                </div>
              </div>
    
              <div className="w-full">
                <label className="text-gray-700 capitalize font-medium">Upload Image</label>
                <input
                  className="p-2 mt-1 border border-gray-300 w-full rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  type="file"
                  name="post"
                //   onChange={handleChange}
                />
              </div>
    
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold hover:opacity-90 transition-all duration-200"
              >
                Edit Profile
              </button>
            </form>
          </div>
        </div>
      );
}

export default UpdatePassword
