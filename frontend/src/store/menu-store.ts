import { create } from "zustand";

interface MenuStore {
  showEmoji: boolean;
  showAttachment: boolean;
  setEmoji: (showEmoji: boolean) => void;
  setAttachment: (showAttachment: boolean) => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  showEmoji: false,
  setEmoji: (showEmoji) => set({ showEmoji }),
  showAttachment: false,
  setAttachment: (showAttachment) => set({ showAttachment }),
}));
