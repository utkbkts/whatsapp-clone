import TraingleIcon from "@/svg/Triangle";
import { MessagesType } from "@/types/type";
import moment from "moment";

interface ChatMessagesProps {
  message: MessagesType;
  me: boolean;
}
const Message = ({ message, me }: ChatMessagesProps) => {
  console.log("🚀 ~ Message ~ me:", me);
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* message container */}
      <div className="">
        <div
          className={`relative h-full  dark:text-dark_text_1 py-5 px-6 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* message */}
          <p className="text-sm font-medium  h-full flex items-center justify-center">
            {message.message}
          </p>
          {/* message dare */}
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
