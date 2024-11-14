import { useChatStore } from "@/store/chat-store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import useMessagesAll from "@/hooks/useMessagesAll";

const ChatContainer = () => {
  const { activeConversation } = useChatStore();
  const convo_id = activeConversation._id;
  const { messages } = useMessagesAll(convo_id);
  console.log("🚀 ~ ChatContainer ~ messages:", messages);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* ChatHeader */}
        <ChatHeader />
        {/* Chat messages */}
        <ChatMessages />
      </div>
    </div>
  );
};

export default ChatContainer;
