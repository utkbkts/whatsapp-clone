import { useSocketContext } from "@/context/SocketContext";
import { capitalize, dateHandler } from "@/helpers/helpers";
import useConversationCreate from "@/hooks/useConversationCreate";
import { useUserStore } from "@/store/user-store";
import { Conversation } from "@/types/type";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "@/utils/chat";

interface ConversationItemProps {
  convo: Conversation;
  online: boolean;
}

export const ConversationItem = ({ convo, online }: ConversationItemProps) => {
  const { ConversationCreate } = useConversationCreate();
  const { user } = useUserStore();
  const { socket } = useSocketContext();
  const handleStartConversation = () => {
    const values = {
      receiver_id: getConversationId(user, convo.users),
      isGroup: false,
    };

    if (!values.receiver_id) {
      console.log("Receiver ID not found. Check the conversation data.");
      return;
    }

    if (socket) {
      socket.emit("join conversation", values.receiver_id);
    }

    ConversationCreate(values);
  };

  return (
    <div
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 p-2"
      onClick={handleStartConversation}
    >
      <div className="flex items-center gap-x-3">
        {/* conversation picture */}
        <div
          className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
            online ? "border-2 border-[#00a884]" : ""
          }`}
        >
          <img
            src={getConversationPicture(user, convo.users)}
            alt={convo.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* conversation name and message */}
        <div className="w-full flex flex-col">
          <h1 className="font-bold flex items-center gap-x-2">
            {capitalize(getConversationName(user, convo.users))}
          </h1>

          <div className="flex items-center gap-x-1 dark:text-dark_text_2">
            <div className="flex-1 items-center gap-x-1 flex justify-between">
              <p>{convo?.latestMessage?.message.substring(0, 20)}</p>
              <span>
                {convo?.createdAt
                  ? dateHandler(convo?.latestMessage?.createdAt)
                  : null}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
