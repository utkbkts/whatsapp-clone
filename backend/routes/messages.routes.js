import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import messagesControllers from "../controllers/message.controllers.js";
const router = express.Router();

router.post("/create", isAuthenticatedUser, messagesControllers.sendMessage);

router.get("/:convo_id", isAuthenticatedUser, messagesControllers.getMessages);

router.delete("/:id", isAuthenticatedUser, messagesControllers.deleteMessage);

export default router;
