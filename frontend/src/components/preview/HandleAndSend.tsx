import { useFileStore } from "@/store/file-store";
import { FormEvent, SetStateAction } from "react";
import Add from "./Add";
import SendIcon from "@/svg/SendIcon";
import { useChatStore } from "@/store/chat-store";
import { useSocketContext } from "@/context/SocketContext";
import useMessageSend from "@/hooks/useMessageSend";
import CloseIcon from "@/svg/Close";
import VideoThumbnail from "react-video-thumbnail";
interface Props {
  activeIndex: number;
  setActiveIndex: React.Dispatch<SetStateAction<number>>;
  message: string;
}

const HandleAndSend = ({ activeIndex, setActiveIndex, message }: Props) => {
  const { files, removeFile } = useFileStore();
  const { activeConversation } = useChatStore();
  const { socket } = useSocketContext();
  const { messageSend } = useMessageSend();

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!socket) return;

    const fileData = files.map((item) => item.imgData);
    const values = {
      convo_id: activeConversation._id,
      files: fileData,
      message,
    };
    try {
      await messageSend(values);
      socket.emit("send message", values);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle remove file
  const handleRemoveFile = (index: number) => {
    console.log("🚀 ~ handleRemoveFile ~ index:", index);
    removeFile(index);
  };

  const file = files[activeIndex];
  if (!file) return null;

  const isImage = file.file.type.startsWith("image/");
  const isVideo = file.file.type === "video/mp4";
  const isPdf = file.file.type === "application/pdf";

  return (
    <div className="w-[97%] items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/* Empty */}
      <span></span>

      <div className="flex gap-x-2 pb-12">
        {files.map((file, i) => (
          <div
            key={i}
            className={`w-14 fileThumbnail h-14 rounded-md overflow-hidden cursor-pointer mt-4 ${
              activeIndex === i
                ? "border-[4px] border-solid border-green_1"
                : "border-[4px] border-transparent"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {isPdf ? (
              <img
                src={`/PDF.png`}
                alt="PDF Icon"
                className="w-8 h-10 mt-1.5 ml-2.5"
              />
            ) : isImage ? (
              <img
                src={file.imgData as string}
                className="w-full h-full object-cover"
                alt="Image"
              />
            ) : isVideo ? (
              <VideoThumbnail
                videoUrl={file.imgData as string}
                width={120}
                height={80}
              />
            ) : (
              <div className="min-h-full hview flex flex-col items-center justify-center">
                <img src="/PDF.png" alt="No preview" />
                <h1 className="dark:text-dark_text_2 text-2xl">
                  No preview available
                </h1>
                <span className="dark:text-dark_text_2">
                  {Math.ceil(file.file.size) / 100} kB - {file.file.type}
                </span>
              </div>
            )}
            <div className="removeFileIcon" onClick={() => handleRemoveFile(i)}>
              <CloseIcon className="dark:fill-dark_svg_1 absolute" />
            </div>
          </div>
        ))}
        {/* Add another file */}
        <Add />
        <form
          onSubmit={sendMessageHandler}
          className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        >
          <button type="submit">
            <SendIcon className="fill-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HandleAndSend;
