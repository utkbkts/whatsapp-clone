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
      console.log(`${user} to online`);
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    io.emit("get-online-users", onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log(`${socket.id} user disconnected`);
    io.emit("get-online-users", onlineUsers);
  });

  // Kullanıcı bir "join conversation" olayı gönderdiğinde
  socket.on("join conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });

  // Bağlantı kesildiğinde kullanıcıya ait tüm odalardan çıkabiliriz
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export { app, io, server };
