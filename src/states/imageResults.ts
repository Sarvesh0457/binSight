import { create } from "zustand";

type WasteItem = {
  detected_object?: string;
  waste_category?: string;
  confidence?: number;
  label?: string;
  score?: number;
};
type ImageResultsState = {
  results: WasteItem[] | null;
  setResults: (results: WasteItem[] | null) => void;
  clearResults: () => void;
};

export const useImageResultsStore = create<ImageResultsState>((set) => ({
  results: [],
  setResults: (results) => set({ results }),
  clearResults: () => set({ results: [] }),
}));



