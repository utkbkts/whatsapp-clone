import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import dotenv from "dotenv";
import { users } from "../db/userData.js";
import { conversationData } from "../db/conversationData.js";
import { messageData } from "../db/messageData.js";
dotenv.config();
const SeederProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    //  await userModel.deleteMany();
    //  console.log("Products Are Deleted !");

    await messageModel.insertMany(messageData);
    console.log("Products Are Added !");
  } catch (error) {
    console.log(error);
  }
};

SeederProduct();
