"use client";
import React, { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    gender: "",
    gmail: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "gmail") {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (value && !gmailRegex.test(value)) {
        setError("Please enter a valid Gmail address");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Gender
          </label>
          <input
            id="gender"
            name="gender"
            type="text"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Male / Female"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gmail */}
        <div>
          <label
            htmlFor="gmail"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Gmail
          </label>
          <input
            id="gmail"
            name="gmail"
            type="email"
            value={formData.gmail}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!!error}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
