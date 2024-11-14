import { dateHandler } from "@/helpers/helpers";
import { Conversation } from "@/types/type";
interface ConversationItemProps {
  convo: Conversation;
}

const ConversationItem = ({ convo }: ConversationItemProps) => {
  return (
    <div className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 p-2">
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
          <h1 className="font-bold flex items-center gap-x-2">{convo.name}</h1>
          {/* conversation message */}
          <div className="">
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 flex justify-between">
                <p>{convo?.latestMessage?.message}</p>
                <span>{dateHandler(convo?.latestMessage?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
