import { ArrowLeft, FileText } from 'lucide-react';
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-4">
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-900">About</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6">
        {/* Version Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center px-4 py-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">Version</div>
              <div className="text-sm text-gray-500">0.1.0</div>
            </div>
          </div>
        </div>

        {/* Additional sections can be added here */}
        {/* Example: App Info Section */}
        <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">App Information</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              This application is designed to provide you with the best user experience. 
              We regularly update the app to include new features and improvements.
            </p>
          </div>
        </div>

        {/* Developer Info Section */}
        <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Developer</h3>
            <p className="text-sm text-gray-500">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>

        {/* Terms and Privacy Section */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-white rounded-lg border border-gray-200 px-4 py-4 text-left hover:bg-gray-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Terms of Service</div>
          </button>
          
          <button className="w-full bg-white rounded-lg border border-gray-200 px-4 py-4 text-left hover:bg-gray-50 transition-colors">
            <div className="text-sm font-medium text-gray-900">Privacy Policy</div>
          </button>
        </div>
      </div>
    </div>
  );
}