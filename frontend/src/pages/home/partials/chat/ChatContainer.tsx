import { useChatStore } from "@/store/chat-store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import useMessagesAll from "@/hooks/useMessagesAll";
import ChatActions from "./ChatActions";
import useOnlineUsersListener from "@/hooks/useOnlineUsersListener";
import { checkOnlineStatus } from "@/utils/chat";
import { useUserStore } from "@/store/user-store";
import { useFileStore } from "@/store/file-store";
import FilePreview from "@/components/preview/FilePreview";

const ChatContainer = () => {
  const { activeConversation } = useChatStore();
  const { user } = useUserStore();
  const convo_id = activeConversation._id;
  const { messages } = useMessagesAll(convo_id);
  const { onlineUsers } = useOnlineUsersListener();
  const { files } = useFileStore();
  console.log("🚀 ~ ChatContainer ~ files:", files);
  const fileLength = files.map((item) => item.file).length;
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
        {fileLength > 0 ? (
          <FilePreview />
        ) : (
          <>
            <ChatMessages messages={messages} /> <ChatActions />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
