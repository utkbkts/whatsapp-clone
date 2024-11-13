import { axios } from "@/lib/axios";
import { useChatStore } from "@/store/chat-store";
import { useEffect } from "react";

const useConversationAll = () => {
  const { setConversation, conversations } = useChatStore();
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get("/conversation/getConversation");
        const data = response.data;
        setConversation(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversation();
  }, [setConversation]);
  return { conversations };
};

export default useConversationAll;
