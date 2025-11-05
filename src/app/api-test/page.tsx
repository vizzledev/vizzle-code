"use client";

import ApiHealthCheck from '@/components/ApiHealthCheck';
import { ExternalLink } from 'lucide-react';

export default function ApiTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">API Connection Test</h1>
          <p className="text-gray-600">Verify your connection to the Vizzle API</p>
        </div>

        {/* Health Check */}
        <ApiHealthCheck />

        {/* API Info */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">API Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Backend URL</h3>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-3 py-2 rounded flex-1 text-sm">
                  {process.env.NEXT_PUBLIC_API_BASE_URL || 'https://vizzle-backend-vvc6.onrender.com'}
                </code>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://vizzle-backend-vvc6.onrender.com'}/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  API Docs
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Available Endpoints</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">GET</span>
                  <code>/health</code>
                  <span className="text-gray-500">- Health check</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">POST</span>
                  <code>/api/upload/human/</code>
                  <span className="text-gray-500">- Upload person image</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">POST</span>
                  <code>/api/upload/tryonitem/</code>
                  <span className="text-gray-500">- Upload garment image</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">POST</span>
                  <code>/api/virtual-try-on/</code>
                  <span className="text-gray-500">- Perform virtual try-on</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">GET</span>
                  <code>/api/virtual-try-on/status/:id</code>
                  <span className="text-gray-500">- Check status</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">GET</span>
                  <code>/api/virtual-try-on/wait/:id</code>
                  <span className="text-gray-500">- Wait for completion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">POST</span>
                  <code>/api/layered-try-on/</code>
                  <span className="text-gray-500">- Add more clothing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-xs">POST</span>
                  <code>/api/generate-video/</code>
                  <span className="text-gray-500">- Generate video</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono text-xs">GET</span>
                  <code>/api/check-garment-safety/</code>
                  <span className="text-gray-500">- Check garment type</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/main/scan"
              className="flex items-center justify-between p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              <div>
                <h3 className="font-semibold">Virtual Try-On</h3>
                <p className="text-sm text-gray-600">Try on clothes virtually</p>
              </div>
              <ExternalLink className="w-5 h-5 text-purple-500" />
            </a>
            
            <a
              href="https://vizzle-backend-vvc6.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <div>
                <h3 className="font-semibold">API Documentation</h3>
                <p className="text-sm text-gray-600">View full API docs</p>
              </div>
              <ExternalLink className="w-5 h-5 text-blue-500" />
            </a>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
          <div className="prose prose-sm max-w-none">
            <ol className="space-y-3">
              <li>
                <strong>Create .env.local file</strong>
                <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                  <code>NEXT_PUBLIC_API_BASE_URL=https://vizzle-backend-vvc6.onrender.com</code>
                </pre>
              </li>
              <li>
                <strong>Install dependencies</strong>
                <pre className="bg-gray-100 p-3 rounded mt-2">
                  <code>npm install</code>
                </pre>
              </li>
              <li>
                <strong>Start development server</strong>
                <pre className="bg-gray-100 p-3 rounded mt-2">
                  <code>npm run dev</code>
                </pre>
              </li>
              <li>
                <strong>Regenerate types (if API changes)</strong>
                <pre className="bg-gray-100 p-3 rounded mt-2">
                  <code>npm run generate-types</code>
                </pre>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

