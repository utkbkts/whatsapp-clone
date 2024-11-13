import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";

// Debounce fonksiyonu
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useConversationSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const searchConversation = async () => {
      try {
        if (debouncedSearchTerm) {
          const response = await axios.get(
            `/auth/search?user=${debouncedSearchTerm}`
          );
          const data = response.data;
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Arama sırasında bir hata oluştu:", error);
      }
    };

    searchConversation();
  }, [debouncedSearchTerm]);

  return { searchTerm, setSearchTerm, searchResults };
};

export default useConversationSearch;
