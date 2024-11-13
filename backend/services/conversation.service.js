import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const doesConversationExist = async (
  sender_id,
  receiver_id,
  isGroup
) => {
  try {
    // Eğer grup değilse birebir konuşma döndür
    if (!isGroup) {
      let convos = await Conversation.find({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: sender_id } } },
          { users: { $elemMatch: { $eq: receiver_id } } },
        ],
      })
        .populate("users")
        .populate("latestMessage");

      // Eğer bulunamazsa uyarı döndür
      if (!convos)
        throw new Error(
          "Please provide the user id you want to start a conversation with!"
        );

      convos = await User.populate(convos, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });

      return convos[0];
    }
    // Eğer grupsa grup konuşmasını döndür
    else {
      let convo = await Conversation.findById(isGroup)
        .populate("users admin")
        .populate({
          path: "latestMessage",
          populate: {
            path: "sender",
            select: "name email picture status",
          },
        });

      // Eğer grup bulunamazsa uyarı döndür
      if (!convo) throw new Error("Something went wrong!");

      return convo;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message); // Hata mesajını döndür
  }
};

export const createConversationData = async (data) => {
  try {
    const newConvo = await Conversation.create(data);
    if (!newConvo) throw new Error("Something went wrong!");
    return newConvo;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  try {
    const populatedConvo = await Conversation.findById(id).populate(
      fieldToPopulate,
      fieldsToRemove
    );
    if (!populatedConvo) throw new Error("Something went wrong!");
    return populatedConvo;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
export const getUserConversations = async (user_id) => {
  try {
    const conversations = await Conversation.find({
      users: { $elemMatch: { $eq: user_id } },
    })
      .populate("users")
      .populate("admin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .populate({
        path: "latestMessage.sender",
        select: "name email picture status",
      });

    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateLatestMessage = async (convo_id, msg) => {
  try {
    const updatedConvo = await Conversation.findByIdAndUpdate(convo_id, {
      latestMessage: msg,
    });
    if (!updatedConvo) throw new Error("Something went wrong");

    return updatedConvo;
  } catch (error) {
    throw new Error(error.message);
  }
};
