import { searchResultsType } from "@/types/type";
import { create } from "zustand";

interface SearchStoreState {
  searchResults: searchResultsType;
  setSearchResults: (results: searchResultsType) => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
  searchResults: {
    results: 0,
    success: false,
    users: [],
  },
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useSearchStore;
