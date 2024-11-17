import { useState } from "react";
import { axios } from "@/lib/axios";
import { useChatStore } from "@/store/chat-store";
import { useSocketContext } from "@/context/SocketContext";

interface MessageSendParams {
  message: string;
  convo_id: number;
  files?: (string | null)[];
}

interface MessageSendResponse {
  success: boolean;
  data: any;
}

interface UseMessageSendReturn {
  messageSend: (
    params: MessageSendParams
  ) => Promise<MessageSendResponse | void>;
  loading: boolean;
  error: string | null;
}

const useMessageSend = (): UseMessageSendReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addMessage } = useChatStore();
  const { socket } = useSocketContext();
  const messageSend = async ({
    message,
    convo_id,
    files,
  }: MessageSendParams): Promise<MessageSendResponse | void> => {
    setError(null);
    setLoading(true);
    if (!socket) return;
    try {
      const response = await axios.post<MessageSendResponse>(
        "/messages/create",
        { message, convo_id, files }
      );
      socket.emit("send message", response.data);
      addMessage(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "An unexpected error occurred");
      console.error("Error sending message:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { messageSend, loading, error };
};

export default useMessageSend;
