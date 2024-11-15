import { useSocketContext } from "@/context/SocketContext";
import useConversationCreate from "@/hooks/useConversationCreate";

const Contact = ({ contact }: any) => {
  const { ConversationCreate } = useConversationCreate();
  const { socket } = useSocketContext();

  const handleStartConversation = () => {
    const values = {
      receiver_id: contact._id,
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
    <li
      onClick={handleStartConversation}
      className="list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_2 p-1"
    >
      {/* Container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* Contact */}
        <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src={contact?.picture?.url}
            alt={contact?.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* conversation name and message */}
        <div className="w-full flex flex-col">
          <h1 className="font-bold flex items-center gap-x-2">
            {contact?.name}
          </h1>
          {/* conversation status */}
          <div className="">
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2 flex justify-between">
                <p>{contact?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Contact;
