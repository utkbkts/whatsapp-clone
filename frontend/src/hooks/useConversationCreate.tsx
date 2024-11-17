import { axios } from "@/lib/axios";
import { useChatStore } from "@/store/chat-store";

const useConversationCreate = () => {
  const { setActiveConversation } = useChatStore();

  const ConversationCreate = async (receiver_id: any) => {
    try {
      const response = await axios.post("/conversation/create", receiver_id);
      const data = await response.data;
      setActiveConversation(data);
    } catch (error) {
      console.error("Error creating conversation", error);
    }
  };

  return { ConversationCreate };
};

export default useConversationCreate;
