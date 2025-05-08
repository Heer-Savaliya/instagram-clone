import React, { useState } from "react";
import { FaUserCircle,FaUserShield,FaPhoneAlt,FaImages } from "react-icons/fa";
import { RiLockPasswordFill,RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailLock } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";
import axios from "axios"; 

const Registration = () => {
  const [error,setError]=useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData,setFormData]=useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    profile: null,
  });

  const handleChange = (e)=>{
    if (e.target.name === "profile"){
      setFormData({
        ...formData,
        profile: e.target.files[0],
      });
    }else{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    const { fullname, username, email, phone, password, profile } = formData;
  
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", profile);
      formData.append("upload_preset", "myuploadpreset"); 
  
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dxctlq87l/image/upload", 
        formData
      );
  
      const imageUrl = cloudinaryResponse.data.secure_url;
  
      // Store user in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        user_id: user.uid,
        fullname,
        username,
        email,
        phone: Number(phone),
        profile: imageUrl,
      });
  
      alert("New user registered successfully.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }finally{
      setLoading(false); // stop loading
    }
  };
  

  return (
    <div className="min-h-screen bg-[#F8F5F8] flex justify-center items-center px-4">
      <div className="bg-white md:p-10 p-6 shadow-2xl rounded-2xl w-full max-w-3xl">
        <img src="./images/logo.jpg" alt="logo" className="h-[50px] mx-auto mb-5" />
        <div className="text-center mb-7 text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rerum ut voluptate quos in eum nisi consectetur itaque earum id laborum, molestiae sapiente .</p>
        </div>
        
        {loading && (
  <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
    <img src="./images/loader.gif" alt="Loading..." className="" />
  </div>
)}


      {error && <p className="text-center py-4 font-semibold text-red-500">{error}</p>}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3 ">
              <FaUserCircle size={20} className="text-gray-500"/>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3 ">
              <FaUserShield size={20} className="text-gray-500"/>
                <input
                name="username"
                  type="text"
                  placeholder="User Name"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3 ">
              <MdOutlineMailLock size={20} className="text-gray-500"/>
                <input
                name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3">
              <FaPhoneAlt size={20} className="text-gray-500"/>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3">
              <RiLockPasswordFill size={20} className="text-gray-500"/>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md flex items-center !px-3">
              <RiLockPasswordLine size={20} className="text-gray-500"/>
                <input
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 rounded-md bg-white focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          
          <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
            <div className="bg-white rounded-md flex items-center !px-3">
            <FaImages size={20} className="text-gray-500"/>
              <input
                type="file"
                name="profile"
                placeholder="Profile image"
                className="w-full p-3 rounded-md bg-white focus:outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
              type="submit"
              className="w-full cursor-pointer p-3 mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold shimmer-hover"
            >
              Register Now
            </button>
        </form>

        <div className="text-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <NavLink to="/login" className="text-sm text-blue-500 hover:underline">
                Sign in
              </NavLink>
            </span>
          </div>
      </div>
    </div>
  );
};

export default Registration;
