import { useChatStore } from "@/store/chat-store";
import Sidebar from "./partials/sidebar/Sidebar";
import WhatsAppHome from "./partials/chat/WhatsAppHome";

const HomePage = () => {
  const { activeConversation } = useChatStore();
  console.log("🚀 ~ HomePage ~ activeConversation:", activeConversation);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-start justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* active conversation */}
        {activeConversation._id ? "home" : <WhatsAppHome />}
      </div>
    </div>
  );
};

export default HomePage;
