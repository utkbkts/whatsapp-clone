import Message from "../models/message.model.js";

// Mesaj oluşturma fonksiyonu
export const createMessage = async (msgData) => {
  try {
    const newMessage = await Message.create(msgData);
    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Message could not be created.");
  }
};

// Mesaj popülasyonu fonksiyonu
export const populateMessage = async (id) => {
  try {
    const msg = await Message.findById(id)
      .populate({
        path: "sender",
        select: "name picture",
        model: "user",
      })
      .populate({
        path: "conversation",
        select: "name picture isGroup users",
        model: "conversation",
        populate: {
          path: "users",
          select: "name email picture status",
          model: "user",
        },
      });

    if (!msg) {
      throw new Error("Message not found.");
    }

    return msg;
  } catch (error) {
    console.error("Error populating message:", error);
    throw new Error(
      error.message || "An error occurred while fetching the message."
    );
  }
};

export const getMessagesByConversation = async (convo_id) => {
  const convo = await Message.find({ conversation: convo_id })
    .populate("sender")
    .populate("conversation");

  if (!convo) {
    throw new Error("Conversation not found.");
  }

  return convo;
};
