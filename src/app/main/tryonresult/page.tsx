"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Share2, Download, Sparkles } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function TryOnResultPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>("/v1.jpg");
  const [garmentName, setGarmentName] = useState<string>("Product");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }

    // Load actual result from localStorage
    const savedResult = localStorage.getItem("tryonResult");
    const savedName = localStorage.getItem("tryonGarmentName");
    
    if (savedResult) {
      setResultUrl(savedResult);
    }
    if (savedName) {
      setGarmentName(savedName);
    }
  }, []);

  const handleCustomShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out how ${garmentName} looks on me with Vizzle Virtual Try-On!`);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "instagram":
        toast.info("To share on Instagram, please download and upload this image manually.");
        return;
    }

    window.open(shareUrl, "_blank");
    setShowShareOptions(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vizzle-tryon-${garmentName}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Downloaded successfully!");
    } catch (error) {
      toast.error("Download failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[400px] max-w-[95vw] bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Try-On Result
          </h2>
        </div>

        <p className="text-sm text-gray-600 text-center mb-4">
          ✨ Your virtual try-on with <strong>{garmentName}</strong>
        </p>

        {/* Image Container */}
        <div className="relative rounded-xl overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
          <Image
            src={resultUrl}
            alt="Try On Result"
            fill
            className="rounded-xl object-contain"
          />

          {/* 🔹 Share Icon on Image */}
          {isMobile && (
            <button
              onClick={() => setShowShareOptions(true)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button 
            onClick={() => router.push("/main")}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Try Another
          </button>
        </div>

        {/* Bottom Sheet Share Options */}
        {showShareOptions && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-end z-50">
            <div className="bg-white w-full rounded-t-2xl p-5 animate-slide-up">
              <h3 className="text-center font-semibold mb-4">Share on</h3>

              <div className="flex justify-around text-center">
                <button
                  onClick={() => handleCustomShare("whatsapp")}
                  className="flex flex-col items-center"
                >
                  <FaWhatsapp className="text-green-500 text-3xl" />
                  <span className="text-xs mt-1 text-green-600">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleCustomShare("facebook")}
                  className="flex flex-col items-center"
                >
                  <FaFacebook className="text-blue-600 text-3xl" />
                  <span className="text-xs mt-1 text-blue-600">Facebook</span>
                </button>

                <button
                  onClick={() => handleCustomShare("instagram")}
                  className="flex flex-col items-center"
                >
                  <FaInstagram className="text-pink-500 text-3xl" />
                  <span className="text-xs mt-1 text-pink-500">Instagram</span>
                </button>
              </div>

              <button
                onClick={() => setShowShareOptions(false)}
                className="mt-5 w-full py-2 text-gray-600 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/main/tryon")}
          className="w-full text-center text-sm text-gray-600 hover:text-purple-600 mt-2 py-2 font-medium"
        >
          Back to Try-On
        </button>
      </div>
    </div>
  );
}
