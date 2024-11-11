import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import errorMiddleware from "./middlewares/error.middlewares.js";
import { ConnectedDatabase } from "./db/connected.mongodb.js";

//ROUTES
import authRoutes from "./routes/auth.routes.js";
//path
const __dirname = path.resolve();
//dotEnv config
dotenv.config();

//create express app
const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json request url
app.use(express.json());

//parse json request body
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//api v1 routes
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const server = app.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`server is running PORT:${process.env.PORT}`);
});

const unexpectedErrorHandler = (error) => {
  console.error("Unexpected Error:", error);
  server.close(() => {
    console.log("Server closed due to an unexpected error.");
    process.exit(1);
  });
};

const gracefulShutdown = () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", gracefulShutdown);
