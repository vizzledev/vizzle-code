"use client";

import { useState, useCallback } from 'react';
import { VizzleAPI, type TransformResponse, type VideoResponse } from '@/lib/api/vizzle-api';

/**
 * Hook for uploading human/person image
 */
export function useUploadHuman() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; publicId: string } | null>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const response = await VizzleAPI.uploadHumanImage(file);
      setUploadedImage({ url: response.url, publicId: response.public_id });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploadedImage(null);
    setError(null);
  }, []);

  return { upload, uploading, error, uploadedImage, reset };
}

/**
 * Hook for uploading garment/clothing image
 */
export function useUploadGarment() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; publicId: string } | null>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const response = await VizzleAPI.uploadGarmentImage(file);
      setUploadedImage({ url: response.url, publicId: response.public_id });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploadedImage(null);
    setError(null);
  }, []);

  return { upload, uploading, error, uploadedImage, reset };
}

/**
 * Hook for performing virtual try-on
 */
export function useVirtualTryOn() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TransformResponse | null>(null);
  const [polling, setPolling] = useState(false);

  const performTryOn = useCallback(async (humanImg: string, garmImg: string, options?: {
    garmentType?: string;
    useVision?: boolean;
    params?: any;
  }) => {
    setProcessing(true);
    setError(null);
    try {
      const response = await VizzleAPI.performVirtualTryOn({
        human_img: humanImg,
        garm_img: garmImg,
        garment_type: (options?.garmentType as any) || 'auto_detect',
        use_vision: options?.useVision ?? true,
        params: options?.params,
      });
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to perform try-on';
      setError(errorMessage);
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  const checkStatus = useCallback(async (predictionId: string) => {
    try {
      const response = await VizzleAPI.getVirtualTryOnStatus(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const waitForCompletion = useCallback(async (predictionId: string) => {
    setPolling(true);
    try {
      const response = await VizzleAPI.waitForVirtualTryOn(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to wait for completion';
      setError(errorMessage);
      throw err;
    } finally {
      setPolling(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { performTryOn, checkStatus, waitForCompletion, processing, polling, error, result, reset };
}

/**
 * Hook for performing layered try-on
 */
export function useLayeredTryOn() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TransformResponse | null>(null);
  const [polling, setPolling] = useState(false);

  const performLayeredTryOn = useCallback(async (
    resultImg: string,
    garmImg: string,
    garmentType: string,
    options?: {
      useVision?: boolean;
      params?: any;
    }
  ) => {
    setProcessing(true);
    setError(null);
    try {
      const response = await VizzleAPI.performLayeredTryOn({
        result_img: resultImg,
        garm_img: garmImg,
        garment_type: garmentType as any,
        use_vision: options?.useVision ?? false,
        params: options?.params,
      });
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to perform layered try-on';
      setError(errorMessage);
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  const checkStatus = useCallback(async (predictionId: string) => {
    try {
      const response = await VizzleAPI.getLayeredTryOnStatus(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const waitForCompletion = useCallback(async (predictionId: string) => {
    setPolling(true);
    try {
      const response = await VizzleAPI.waitForLayeredTryOn(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to wait for completion';
      setError(errorMessage);
      throw err;
    } finally {
      setPolling(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { performLayeredTryOn, checkStatus, waitForCompletion, processing, polling, error, result, reset };
}

/**
 * Hook for generating videos
 */
export function useVideoGeneration() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoResponse | null>(null);
  const [polling, setPolling] = useState(false);

  const generateVideo = useCallback(async (
    imageUrl: string,
    options?: {
      motionType?: string;
      duration?: number;
      fps?: number;
    }
  ) => {
    setProcessing(true);
    setError(null);
    try {
      const response = await VizzleAPI.generateVideo({
        image_url: imageUrl,
        motion_type: options?.motionType || 'subtle_walk',
        duration: options?.duration || 3,
        fps: options?.fps || 24,
      });
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate video';
      setError(errorMessage);
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  const checkStatus = useCallback(async (predictionId: string) => {
    try {
      const response = await VizzleAPI.getVideoStatus(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const waitForCompletion = useCallback(async (predictionId: string) => {
    setPolling(true);
    try {
      const response = await VizzleAPI.waitForVideo(predictionId);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to wait for completion';
      setError(errorMessage);
      throw err;
    } finally {
      setPolling(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { generateVideo, checkStatus, waitForCompletion, processing, polling, error, result, reset };
}

/**
 * Hook for checking garment safety
 */
export function useGarmentSafety() {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ allowed: boolean; message: string } | null>(null);

  const checkSafety = useCallback(async (garmentDescription: string) => {
    setChecking(true);
    setError(null);
    try {
      const response = await VizzleAPI.checkGarmentSafety(garmentDescription);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check garment safety';
      setError(errorMessage);
      throw err;
    } finally {
      setChecking(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { checkSafety, checking, error, result, reset };
}

