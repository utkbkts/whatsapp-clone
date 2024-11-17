import Message from "../models/message.model.js";
import { delete_file } from "../utils/cloudinary.js";

// Mesaj oluşturma fonksiyonu
export const createMessage = async (msgData) => {
  try {
    let newMessage = await Message.create(msgData);

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

export const deleteLatestMessage = async (message) => {
  try {
    if (message.files && message.files.length > 0) {
      for (let i = 0; i < message.files.length; i++) {
        await delete_file(message.files[i].public_id);
      }
    }

    await message.deleteOne();
    return message;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error(
      error.message || "An error occurred while deleting the message."
    );
  }
};
