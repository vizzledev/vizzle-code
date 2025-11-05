import { create } from "zustand";

export interface Garment {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  garmentType: string; // Maps to API garment types
  description?: string;
}

interface GarmentStore {
  selectedGarment: Garment | null;
  setSelectedGarment: (garment: Garment | null) => void;
  clearSelectedGarment: () => void;
}

export const useGarmentStore = create<GarmentStore>((set) => ({
  selectedGarment: null,
  setSelectedGarment: (garment) => set({ selectedGarment: garment }),
  clearSelectedGarment: () => set({ selectedGarment: null }),
}));

