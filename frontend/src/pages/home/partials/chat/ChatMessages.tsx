import { MessagesType } from "@/types/type";
import Message from "./Message";
import { useUserStore } from "@/store/user-store";

interface ChatMessagesProps {
  messages: MessagesType[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const { user } = useUserStore();
  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
      bg-cover bg-no-repeat"
    >
      {/* container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]">
        {/* messages */}
        {messages &&
          messages.map((message) => (
            <Message
              message={message}
              key={message._id}
              me={message.sender._id === user?._id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatMessages;
