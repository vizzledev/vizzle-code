"use client";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    alert("Password reset successful"); // replace with API call
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[380px] h-[500px] bg-white p-6 rounded-2xl shadow-md flex flex-col justify-start pt-10">
        {/* Header with back arrow (left) + title (center) */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            className="absolute left-0 text-xl"
            onClick={() => window.history.back()} // Go back
          >
            <IoArrowBack />
          </button>
          <h2 className="text-2xl font-semibold">Reset Your Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Enter your new Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEye className="text-xl" />
                ) : (
                  <AiOutlineEyeInvisible className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Confirm your new Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <AiOutlineEye className="text-xl" />
                ) : (
                  <AiOutlineEyeInvisible className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 mt-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
