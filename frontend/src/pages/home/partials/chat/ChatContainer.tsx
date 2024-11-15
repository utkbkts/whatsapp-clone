import { useChatStore } from "@/store/chat-store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import useMessagesAll from "@/hooks/useMessagesAll";
import ChatActions from "./ChatActions";
import useOnlineUsersListener from "@/hooks/useOnlineUsersListener";
import { checkOnlineStatus } from "@/utils/chat";
import { useUserStore } from "@/store/user-store";

const ChatContainer = () => {
  const { activeConversation } = useChatStore();
  const { user } = useUserStore();
  const convo_id = activeConversation._id;
  const { messages } = useMessagesAll(convo_id);
  const { onlineUsers } = useOnlineUsersListener();
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* ChatHeader */}
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        {/* Chat messages */}
        <ChatMessages messages={messages} />
        {/* chat actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
