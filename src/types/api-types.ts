/**
 * Vizzle API Types
 * Manually defined types for API requests and responses
 */

// Garment Categories
export type GarmentCategory = "upper_body" | "lower_body" | "dresses" | "accessories";

// Garment Types
export type GarmentType = 
  | "shirt" | "t-shirt" | "blouse" | "sweater" | "hoodie" 
  | "jacket" | "coat" | "blazer" | "cardigan" | "tank_top" | "crop_top"
  | "pants" | "jeans" | "trousers" | "shorts" | "skirt" | "leggings"
  | "dress" | "jumpsuit" | "overalls"
  | "hat" | "glasses" | "necklace" | "earrings" | "watch" 
  | "bracelet" | "ring" | "bag" | "scarf" | "accessory"
  | "auto_detect";

// IDM-VTON Parameters
export interface IDMVTONParams {
            garment_des?: string | null;
  category: GarmentCategory;
            mask_img?: string | null;
            crop: boolean;
            force_dc: boolean;
            mask_only: boolean;
            steps: number;
            seed: number;
}

// Image Upload Response
export interface ImageUploadResponse {
            url: string;
            public_id: string;
            message: string;
}

// Transform Response (Virtual Try-On & Layered Try-On)
export interface TransformResponse {
            id: string;
            status: string;
            output?: string | unknown[] | null;
            error?: string | null;
            model_used: string;
}

// Video Response
export interface VideoResponse {
            id: string;
            status: string;
            video_url?: string | null;
            error?: string | null;
            progress?: number | null;
            estimated_time?: number | null;
}

// Virtual Try-On Request
export interface VirtualTryOnRequest {
            human_img: string;
  garm_img: string;
  garment_type: GarmentType;
  use_vision: boolean;
  params?: IDMVTONParams;
}

// Layered Try-On Request
export interface LayeredTryOnRequest {
  result_img: string;
            garm_img: string;
  garment_type: GarmentType;
            use_vision: boolean;
  params?: IDMVTONParams;
}

// Video Generation Request
export interface VideoGenerationRequest {
  image_url: string;
  motion_type: string;
  duration: number;
  fps: number;
}

// Health Response
export interface HealthResponse {
  status: string;
  message: string;
  app_name: string;
}

// Garment Safety Check Response
export interface GarmentSafetyResponse {
  allowed: boolean;
  message: string;
}

// Export component types for backwards compatibility
export interface components {
  schemas: {
    GarmentCategory: GarmentCategory;
    GarmentType: GarmentType;
    IDMVTONParams: IDMVTONParams;
    ImageUploadResponse: ImageUploadResponse;
    TransformResponse: TransformResponse;
    VideoResponse: VideoResponse;
    VirtualTryOnRequest: VirtualTryOnRequest;
    LayeredTryOnRequest: LayeredTryOnRequest;
    VideoGenerationRequest: VideoGenerationRequest;
    HealthResponse: HealthResponse;
    };
}
