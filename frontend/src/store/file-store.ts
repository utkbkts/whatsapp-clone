import { create } from "zustand";

interface FileStoreState {
  files: Array<{ file: File; imgData: string | null }>;
  setFile: (newFile: File, imgData: string) => void;
  clearFile: () => void;
  removeFile: (index: number) => void;
}

export const useFileStore = create<FileStoreState>((set) => ({
  files: [],

  setFile: (newFile, imgData) =>
    set((state) => ({
      files: [...state.files, { file: newFile, imgData }],
    })),

  clearFile: () => set({ files: [] }),

  removeFile: (index: number) =>
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
    })),
}));
