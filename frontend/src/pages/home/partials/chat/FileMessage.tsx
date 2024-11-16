import CloseIcon from "@/svg/Close";
import TraingleIcon from "@/svg/Triangle";
import { MessagesType } from "@/types/type";
import moment from "moment";

interface ChatMessagesProps {
  message: MessagesType;
  me: boolean;
  fileMessage: any;
}
const FileMessage = ({ message, me, fileMessage }: ChatMessagesProps) => {
  const isVideo = fileMessage.url.endsWith(".mp4");

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
          {isVideo ? (
            <video controls src={fileMessage.url} className="w-full h-auto" />
          ) : (
            <img
              src={fileMessage.url}
              alt="file"
              className="w-full h-auto object-contain"
            />
          )}

          {/* message dare */}
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
          {me && (
            <CloseIcon className="dark:fill-dark_svg_1 absolute top-0 right-0 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
