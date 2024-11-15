import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";
import { useSocketContext } from "@/context/SocketContext";
import { useUserStore } from "@/store/user-store";

export const useMessageListener = () => {
  const { updateMessage } = useChatStore();
  const { socket } = useSocketContext();
  const { user } = useUserStore();

  useEffect(() => {
    if (!socket || !user?.user?._id) {
      console.log("socket veya user id bulunamadı");
      return;
    }

    socket.emit("join", user.user._id);

    socket.on("message received", (message) => {
      updateMessage(message);
    });

    return () => {
      socket.off("message received");
    };
  }, [socket, user, updateMessage]);
};
