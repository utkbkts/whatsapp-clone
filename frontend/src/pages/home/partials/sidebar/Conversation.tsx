import { ConversationItem } from "@/components/conversationItem/ConversationItem";
import useConversationAll from "@/hooks/useConversationAll";
import { useUserStore } from "@/store/user-store";
import { checkOnlineStatus } from "@/utils/chat";

const Conversation = ({ onlineUsers }: any) => {
  const { conversations } = useConversationAll();
  const { user } = useUserStore();

  return (
    <div className="convos scrollbar">
      {conversations &&
        conversations.map((convo) => {
          const check: boolean = checkOnlineStatus(
            onlineUsers,
            user,
            convo.users
          );

          return (
            <ConversationItem convo={convo} key={convo._id} online={!!check} />
          );
        })}
    </div>
  );
};

export default Conversation;
