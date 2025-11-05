"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Share2, Download } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function TryOnResultPage() {
  const router = useRouter();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [resultUrl, setResultUrl] = useState<string>("/v1.jpg");
  const [garmentName, setGarmentName] = useState<string>("Product");

  useEffect(() => {
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

  const handleShare = async (platform?: string) => {
    // Try native share API first (mobile)
    if (!platform && navigator.share) {
      try {
        await navigator.share({
          title: "My Virtual Try-On",
          text: `Check out how ${garmentName} looks on me!`,
          url: resultUrl,
        });
        return;
      } catch (error) {
        // User cancelled or error, show options
      }
    }

    // Show share options modal
    if (!platform) {
      setShowShareOptions(true);
      return;
    }

    // Platform-specific sharing
    const url = encodeURIComponent(resultUrl);
    const text = encodeURIComponent(`Check out how ${garmentName} looks on me!`);
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "instagram":
        toast.info("Please download the image and share it on Instagram");
        setShowShareOptions(false);
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareOptions(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vizzle-tryon-${garmentName.replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Try On Result
        </h2>

        {/* Image Container with Share Button */}
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-50">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={resultUrl}
              alt="Try On Result"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Share Icon on Image - Top Right */}
          <button
            onClick={() => handleShare()}
            className="absolute top-3 right-3 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button 
            onClick={() => router.push("/main")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Buy Now
          </button>
        </div>

        {/* Try Another Outfit Link */}
        <button
          onClick={() => router.push("/main/tryon")}
          className="w-full text-center text-blue-600 hover:text-blue-700 py-2 font-medium transition"
        >
          Try another outfit
        </button>

        {/* Share Options Modal */}
        {showShareOptions && (
          <div 
            className="fixed inset-0 bg-black/60 flex justify-center items-end z-50 animate-in fade-in duration-200"
            onClick={() => setShowShareOptions(false)}
          >
            <div 
              className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
              
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
                Share your look
              </h3>

              <div className="grid grid-cols-4 gap-6 mb-6">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                    <FaWhatsapp className="text-green-600 text-2xl" />
                  </div>
                  <span className="text-xs text-gray-700">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleShare("facebook")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                    <FaFacebook className="text-blue-600 text-2xl" />
                  </div>
                  <span className="text-xs text-gray-700">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-200 transition">
                    <FaTwitter className="text-sky-500 text-2xl" />
                  </div>
                  <span className="text-xs text-gray-700">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare("instagram")}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition">
                    <FaInstagram className="text-pink-600 text-2xl" />
                  </div>
                  <span className="text-xs text-gray-700">Instagram</span>
                </button>
              </div>

              <button
                onClick={() => setShowShareOptions(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
