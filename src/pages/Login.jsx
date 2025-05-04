import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const images = [
  "./images/dp.jpg",
  "./images/dp2.jpg",
  "./images/dp3.jpg",
  "./images/dp4.jpg",
];

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit=async(e) =>{
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/");
    }catch(err){
      setError(err.message);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-[#F8F5F8] flex justify-center items-center">
      <div className="bg-white mx-10 p-2 md:p-7 rounded-lg shadow-none md:shadow-lg w-full max-w-5xl flex items-center gap-3 md:gap-8">
        {/* Image Slider */}
        <div className="w-[300px] h-[450px] lg:w-[420px] lg:h-[550px] hidden md:block  overflow-hidden rounded-3xl relative">
          <img
            src={images[currentImage]}
            alt="slider"
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
        </div>

        {/* Login Form */}
        <div className="w-[450px] bg-white p-6 lg:p-10 flex-1">
          <img
            src="./images/logo.jpg"
            alt=""
            className="h-[40px] mx-auto mb-5"
          />

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full p-3 border-none rounded-md bg-white focus:outline-none"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="p-[2px] rounded-md bg-gray-300 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-600 transition-all duration-300">
              <div className="bg-white rounded-md">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="w-full p-3 border-none rounded-md bg-white focus:outline-none"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 mb-2 md:mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold shimmer-hover"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-2 md:my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center p-3 mb-4 border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-100">
            <FaFacebookF className="mr-2" />
            Log in with Facebook
          </button>

          <div className="text-center mb-3 md:mb-6">
            <NavLink to="/forget-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </NavLink>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-sm text-blue-500 hover:underline">
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
