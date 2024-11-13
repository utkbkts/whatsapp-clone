import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import conversationControllers from "../controllers/conversation.controllers.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticatedUser,
  conversationControllers.createConversation
);
router.get(
  "/getConversation",
  isAuthenticatedUser,
  conversationControllers.getConversations
);

export default router;
