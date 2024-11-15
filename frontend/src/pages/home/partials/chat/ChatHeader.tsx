import { capitalize } from "@/helpers/helpers";
import { useChatStore } from "@/store/chat-store";
import DotsIcon from "@/svg/Dots";
import SearchIcon from "@/svg/Search";

const ChatHeader = ({ online }: { online: boolean }) => {
  const { activeConversation } = useChatStore();
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p-[19px] select-none">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          {/* Conversation image */}
          <button className="btn">
            <img
              src={activeConversation.picture.url}
              alt="name picture"
              title="chat picture name"
              className="w-full rounded-full object-cover h-full"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(activeConversation.name.split(" ")[0])}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {online ? "online" : ""}
            </span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          {/* Right */}
          <li>
            <button className="btn">
              <SearchIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
