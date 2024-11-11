import express from "express";
import authControllers from "../controllers/auth.controllers.js";

const routes = express.Router();

routes.post("/register", authControllers.register);

export default routes;
