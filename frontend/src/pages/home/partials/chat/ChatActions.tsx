import AttachMents from "@/components/attachMents/AttachMents";
import EmojiPicker from "@/components/emojiPicker/EmojiPicker";
import { useSocketContext } from "@/context/SocketContext";
import useMessageSend from "@/hooks/useMessageSend";
import { useChatStore } from "@/store/chat-store";
import SendIcon from "@/svg/SendIcon";
import Input from "@/ui/Input";
import React, { useRef, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const ChatActions = () => {
  const [message, setMessage] = useState("");
  const { activeConversation } = useChatStore();
  const { messageSend, loading } = useMessageSend();
  const { socket } = useSocketContext();

  const textRef = useRef<HTMLInputElement>(null);
  const [typing, setTyping] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!socket) return;
    if (!typing) {
      setTyping(true);
      console.log(typing, "typing");
      socket.emit("typing", activeConversation._id);
    }
    const lastTypingTime = new Date().getTime();
    const timer = 1000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        console.log(typing, "stop typing");
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await messageSend(values);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-dark_bg_2 w-full flex items-center absolute bottom- py-2 select-none h-[60px]"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex">
          <EmojiPicker
            textRef={textRef}
            message={message}
            setMessage={setMessage}
          />
          <AttachMents />
        </ul>
        {/* Input component */}
        <Input
          placeholder="Type a message"
          text="text"
          value={message}
          handleChange={handleChange}
          ref={textRef}
        />
        {/* Send button */}
        <button type="submit" className="btn">
          {loading ? (
            <MoonLoader size={20} color="#fff" />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
