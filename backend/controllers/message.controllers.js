import catchAsyncError from "../middlewares/catch.middleware.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getMessagesByConversation,
  populateMessage,
} from "../services/messages.service.js";
import ErrorHandler from "../utils/error.handler.js";

const sendMessage = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const { message, convo_id, files } = req.body;

  if (!convo_id || (!message && !files)) {
    return next(new ErrorHandler("Invalid request", 400));
  }

  const msgData = {
    sender: userId,
    message,
    files,
    conversation: convo_id,
    files: files || [],
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
