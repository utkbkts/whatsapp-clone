import { create } from "zustand";

// Define a type to store both the `File` and its base64 representation
interface FileStoreState {
  files: Array<{ file: File; imgData: string | null }>;
  setFile: (newFile: File, imgData: string) => void;
  clearFile: () => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
  files: [],

  setFile: (newFile, imgData) =>
    set((state) => ({
      files: [...state.files, { file: newFile, imgData }],
    })),

  clearFile: () => set({ files: [] }),
}));
