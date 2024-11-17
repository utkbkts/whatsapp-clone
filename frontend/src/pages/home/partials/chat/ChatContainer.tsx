import { useChatStore } from "@/store/chat-store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import useMessagesAll from "@/hooks/useMessagesAll";
import ChatActions from "./ChatActions";
import { checkOnlineStatus } from "@/utils/chat";
import { useUserStore } from "@/store/user-store";
import { useFileStore } from "@/store/file-store";
import FilePreview from "@/components/preview/FilePreview";

const ChatContainer = ({ callUser, onlineUsers }: any) => {
  const { activeConversation } = useChatStore();
  const { user } = useUserStore();
  const convo_id = activeConversation._id;
  const { messages } = useMessagesAll(convo_id);
  const { files } = useFileStore();
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
          callUser={callUser}
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
