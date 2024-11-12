import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
    },
    files: [],
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;
