import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const routes = express.Router();

routes.post("/register", authControllers.register);

routes.post("/login", authControllers.login);

routes.post("/logout", authControllers.logout);

routes.post("/refreshtoken", authControllers.refreshToken);

export default routes;
