import catchAsyncError from "../middlewares/catch.middleware.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getMessagesByConversation,
  populateMessage,
} from "../services/messages.service.js";
import { upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/error.handler.js";
const sendMessage = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const { message, convo_id, files } = req.body;

  if (!convo_id || (!message && !files)) {
    return next(new ErrorHandler("Invalid request", 400));
  }
  const staticImages = await Promise.all(
    files?.map((item) => upload_file(item, "whatsapp"))
  );

  const msgData = {
    sender: userId,
    message,
    conversation: convo_id,
    files: staticImages || [],
  };

  let newMessage = await createMessage(msgData);

  let populatedMessage = await populateMessage(newMessage._id);
  await updateLatestMessage(convo_id, newMessage);
  res.json(populatedMessage);
});

const getMessages = catchAsyncError(async (req, res, next) => {
  const convo_id = req.params.convo_id;

  const messages = await getMessagesByConversation(convo_id);

  if (!messages) {
    return next(
      new ErrorHandler("No messages found in this conversation", 404)
    );
  }
  res.json(messages);
});

export default { sendMessage, getMessages };
