"use client";

import { useState, useEffect } from 'react';
import { VizzleAPI } from '@/lib/api/vizzle-api';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

interface HealthStatus {
  status: 'checking' | 'connected' | 'error';
  message: string;
  details?: any;
}

export default function ApiHealthCheck() {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'checking',
    message: 'Checking API connection...',
  });

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setHealth({
      status: 'checking',
      message: 'Checking API connection...',
    });

    try {
      const response = await VizzleAPI.checkHealth();
      setHealth({
        status: 'connected',
        message: 'API connected successfully!',
        details: response,
      });
    } catch (error) {
      setHealth({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to connect to API',
      });
    }
  };

  const getStatusIcon = () => {
    switch (health.status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (health.status) {
      case 'checking':
        return 'border-blue-200 bg-blue-50';
      case 'connected':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="font-semibold">API Status</h3>
          <p className="text-sm">{health.message}</p>
          {health.details && (
            <div className="mt-2 text-xs opacity-75">
              <p>App: {health.details.app_name}</p>
              <p>Status: {health.details.status}</p>
            </div>
          )}
        </div>
        {health.status === 'error' && (
          <button
            onClick={checkApiHealth}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        )}
      </div>
      
      {health.status === 'error' && (
        <div className="mt-4 p-3 bg-white rounded border border-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-2">Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Check if .env.local file exists with NEXT_PUBLIC_API_BASE_URL</li>
                <li>Verify internet connection</li>
                <li>Backend may be cold-starting (try again in 30 seconds)</li>
                <li>Check browser console for detailed error</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

