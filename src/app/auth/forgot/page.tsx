// pages/forgot-password.tsx or app/forgot-password/page.tsx
"use client";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import PasswordResetCard from "@/components/PasswordResetCard"; // Adjust path as needed

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [showCard, setShowCard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // For testing - show card immediately without API call
    setIsLoading(true);
    
    // Simulate brief loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      setShowCard(true);
    }, 500);

    // TODO: Replace with actual API call when ready
    /*
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setShowCard(true);
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleCheckEmail = () => {
    // Open default email client
    window.open('mailto:', '_blank');
  };

  const handleResendLink = async () => {
    if (!email) return;
    
    // For testing - just show alert without API call
    alert("Reset link sent again! (Testing mode)");

    // TODO: Replace with actual API call when ready
    /*
    setIsLoading(true);
    try {
      const response = await fetch('/api/resend-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert("Reset link sent again!");
      } else {
        throw new Error('Failed to resend email');
      }
    } catch (error) {
      console.error('Error resending email:', error);
      alert("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
    */
  };

  const handleCloseCard = () => {
    setShowCard(false);
    // Optionally redirect to login page or clear form
    // router.push('/login');
    // setEmail("");
  };

  return (
    <>
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[380px] h-[500px] bg-white p-6 rounded-2xl shadow-md flex flex-col justify-start pt-10">
          
          {/* Header with back arrow + title */}
          <div className="relative flex items-center justify-center mb-6">
            <button
              type="button"
              className="absolute left-0 text-xl hover:text-blue-600 transition-colors"
              onClick={() => window.history.back()}
            >
              <IoArrowBack />
            </button>
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Modal Overlay - Password Reset Card */}
      <PasswordResetCard
        isVisible={showCard}
        userEmail={email}
        onCheckEmail={handleCheckEmail}
        onClose={handleCloseCard}
        onResendLink={handleResendLink}
      />
    </>
    </>
  );
}