import React from "react";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F8] flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[350px]">
        {/* Logo */}
        <h1 className="text-center text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text mb-8">
          Instagram
        </h1>

        {/* Login Form */}
        <form>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            className="w-full p-3 mb-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full p-3 mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold hover:opacity-90"
          >
            Log In
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Facebook Login */}
        <button className="w-full flex items-center justify-center p-3 mb-4 border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-100">
          <FaFacebookF className="mr-2" />
          Log in with Facebook
        </button>

        {/* Forgot Password */}
        <div className="text-center mb-6">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
