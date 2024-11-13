import express from "express";
import authControllers from "../controllers/auth.controllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const routes = express.Router();

routes.post("/register", authControllers.register);

routes.post("/login", authControllers.login);

routes.post("/logout", authControllers.logout);

routes.get("/getUser", isAuthenticatedUser, authControllers.getUser);

export default routes;
