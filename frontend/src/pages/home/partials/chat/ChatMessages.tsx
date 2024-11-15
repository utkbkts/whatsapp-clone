import { MessagesType } from "@/types/type";
import Message from "./Message";
import { useUserStore } from "@/store/user-store";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: MessagesType[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const { user } = useUserStore();
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);
  return (
    <div
      className=" bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
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
              me={message?.sender?._id === user?.user._id}
            />
          ))}
        <div className="mt-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
