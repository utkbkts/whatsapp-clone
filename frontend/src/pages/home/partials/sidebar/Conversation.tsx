import ConversationItem from "@/components/conversationItem/ConversationItem";
import useConversationAll from "@/hooks/useConversationAll";

const Conversation = () => {
  const { conversations } = useConversationAll();
  return (
    <div className="convos scrollbar">
      {conversations &&
        conversations.map((convo) => (
          <ConversationItem convo={convo} key={convo._id} />
        ))}
    </div>
  );
};

export default Conversation;
