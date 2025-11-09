"use client"; // 👈 ye sabse top pe hona chahiye

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function LogoutPage() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowPopup(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Logout Button */}
      <button
        onClick={() => setShowPopup(true)} // 👈 ab sirf card khulega
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-lg font-semibold shadow-md transition-all"
      >
        Logout
      </button>

      {/* Confirmation Card Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[300px] text-center animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              You really want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-200 rounded-md text-black font-semibold hover:bg-gray-300 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fade Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
