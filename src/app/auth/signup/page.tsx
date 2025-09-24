"use client";
import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[380px] bg-white p-6 rounded-2xl shadow-md">
        
        {/* Header with back arrow (left) + title (center) */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            className="absolute left-0 text-xl"
            onClick={() => window.history.back()} // Go back
          >
            <IoArrowBack />
          </button>
          <h2 className="text-2xl font-semibold">Register</h2>
        </div>

        {/* Google Login */}
        <button className="flex items-center justify-center w-full gap-2 bg-black text-white py-3 rounded-lg mb-3 hover:opacity-90">
          <FcGoogle className="text-xl" />
          Register with Google
        </button>

        {/* Facebook Login */}
        <button className="flex items-center justify-center w-full gap-2 bg-black text-white py-3 rounded-lg mb-6 hover:opacity-90">
          <FaFacebook className="text-blue-500 text-xl" />
          Register with Facebook
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or register with email</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible className="text-xl" />
              ) : (
                <AiOutlineEye className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/*  Confirm Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1"> Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
           </div>
        </div> 

        

        {/* Register Button */}
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 mb-4">
          Register
        </button>

        {/* Login */}
        <p className="text-center text-sm ">
           have an account?{" "}
          <span className="font-semibold cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
