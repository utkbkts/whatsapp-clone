import catchAsyncError from "../middlewares/catch.middleware.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import {
  createConversationData,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";
import ErrorHandler from "../utils/error.handler.js";

const createConversation = catchAsyncError(async (req, res, next) => {
  const sender_id = req.user._id;
  const { receiver_id, isGroup } = req.body;

  if (isGroup == false) {
    if (!receiver_id) {
      return next(
        new ErrorHandler(
          "please provide the user id you wanna start a conversation with !",
          404
        )
      );
    }
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id,
      false
    );
    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await User.findById(receiver_id);
      let convoData = {
        name: receiver_user.name,
        picture: receiver_id.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversationData(convoData);
      const populatedConvo = await populateConversation(newConvo._id, "users");
      res.status(200).json(populatedConvo);
    }
  } else {
    const existed_group_conversation = await doesConversationExist(
      "",
      "",
      isGroup
    );
    res.status(200).json(existed_group_conversation);
  }
});

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export default { createConversation, getConversations };
