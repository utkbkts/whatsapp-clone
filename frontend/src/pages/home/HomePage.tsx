import { useChatStore } from "@/store/chat-store";
import Sidebar from "./partials/sidebar/Sidebar";
import WhatsAppHome from "./partials/chat/WhatsAppHome";
import ChatContainer from "./partials/chat/ChatContainer";
import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import { useUserStore } from "@/store/user-store";

const HomePage = () => {
  const { activeConversation } = useChatStore();
  const { socket } = useSocketContext();
  const { user } = useUserStore();
  const { updateMessage } = useChatStore();

  useEffect(() => {
    socket?.emit("join", user?.user._id);
  }, [user]);

  useEffect(() => {
    if (!socket) {
      console.log("socket not found");
      return;
    }

    socket.on("message received", (message) => {
      updateMessage(message);
    });

    return () => {
      socket.off("message received");
    };
  }, [socket, updateMessage]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-start justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* active conversation */}
        {activeConversation._id ? <ChatContainer /> : <WhatsAppHome />}
      </div>
    </div>
  );
};

export default HomePage;
