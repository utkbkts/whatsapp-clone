import { capitalize, dateHandler } from "@/helpers/helpers";
import useConversationCreate from "@/hooks/useConversationCreate";
import { useUserStore } from "@/store/user-store";
import { Conversation } from "@/types/type";
import { getConversationId } from "@/utils/chat";
interface ConversationItemProps {
  convo: Conversation;
}

const ConversationItem = ({ convo }: ConversationItemProps) => {
  const { ConversationCreate } = useConversationCreate();
  const { user } = useUserStore();

  const handleStartConversation = () => {
    const values = {
      receiver_id: getConversationId(user, convo.users),
      isGroup: false,
    };

    ConversationCreate(values);
  };
  return (
    <div
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 p-2"
      onClick={handleStartConversation}
    >
      {/* left */}
      <div className="flex items-center gap-x-3">
        {/* conversation */}
        <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={convo.picture?.url}
            alt={convo.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* conversation name and message */}
        <div className="w-full flex flex-col">
          <h1 className="font-bold flex items-center gap-x-2">
            {capitalize(convo?.name)}
          </h1>
          {/* conversation message */}
          <div className="">
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 flex justify-between">
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
    </div>
  );
};

export default ConversationItem;
