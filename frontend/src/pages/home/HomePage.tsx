import { useChatStore } from "@/store/chat-store";
import Sidebar from "./partials/sidebar/Sidebar";
import WhatsAppHome from "./partials/chat/WhatsAppHome";
import ChatContainer from "./partials/chat/ChatContainer";

const HomePage = () => {
  const { activeConversation } = useChatStore();
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
