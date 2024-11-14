import { axios } from "@/lib/axios";
import { useChatStore } from "@/store/chat-store";
import { useEffect } from "react";

const useMessagesAll = (convo_id: string | number) => {
  const { setMessages, messages } = useChatStore();

  useEffect(() => {
    if (!convo_id) return;

    const messagesAll = async () => {
      try {
        const response = await axios.get(`/messages/${convo_id}`);
        const data = response.data;
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    messagesAll();
  }, [convo_id, setMessages]);
  return { messages };
};

export default useMessagesAll;
