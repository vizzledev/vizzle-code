// components/PasswordResetCard.tsx
"use client";
import React from 'react';
import { IoMail, IoClose } from 'react-icons/io5';

interface PasswordResetCardProps {
  isVisible: boolean;
  userEmail?: string;
  onCheckEmail?: () => void;
  onClose: () => void;
  onResendLink?: () => void;
}

const PasswordResetCard: React.FC<PasswordResetCardProps> = ({
  isVisible,
  userEmail,
  onCheckEmail,
  onClose,
  onResendLink
}) => {
  if (!isVisible) return null;

  const handleCheckEmail = () => {
    if (onCheckEmail) {
      onCheckEmail();
    } else {
      // Default behavior - try to open email client
      window.open('mailto:', '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[320px] relative animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Email Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <IoMail className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-3">
          Check Your Email!
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          We've sent a password reset link to your email. Its valid for 24 hours.
        </p>

        {/* Check Email Button */}
        <button
          onClick={handleCheckEmail}
          className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Check Email
        </button>
      </div>
    </div>
  );
};

export default PasswordResetCard;