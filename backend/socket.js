import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUsers = [];
io.on("connection", (socket) => {
  // Kullanıcı "join" olayı gönderdiğinde
  socket.on("join", (user) => {
    socket.join(user);
    if (!onlineUsers.some((u) => u.userId === user)) {
      //en az biri true olursa true olur
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    io.emit("get-online-users", onlineUsers);
    //send socket id
    io.emit("setup socket", socket.id);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-online-users", onlineUsers);
  });

  // Kullanıcı bir "join conversation" olayı gönderdiğinde
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });

  //typing
  socket.on("typing", (conversation) => {
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    socket.in(conversation).emit("stop typing");
  });

  //call
  //---call user
  socket.on("call user", (data) => {
    let userId = data.userToCall;

    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId.socketId).emit("call user", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });
  //---answer call
  socket.on("answer call", (data) => {
    io.to(data.to).emit("call accepted", data.signal);
  });
  //---end call
  socket.on("end call", (id) => {
    io.to(id).emit("end call");
  });
  // Bağlantı kesildiğinde kullanıcıya ait tüm odalardan çıkabiliriz
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, io, server };
