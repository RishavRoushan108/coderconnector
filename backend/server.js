import express from "express";
import { Server } from "socket.io";
import http from "http";
import chatModel from "./model/chat.js";

const app = express();
const server = http.createServer(app);

import dotenv from "dotenv";
dotenv.config();
import connectdb from "./database.js";

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(express.json());

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRoute from "./routes/request.js";
import connectionRoute from "./routes/connection.js";
import chatRouter from "./routes/chat.js";

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRoute);
app.use("/", connectionRoute);
app.use("/", chatRouter);

// socket io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    if (!users[userId]) {
      users[userId] = new Set();
    }
    users[userId].add(socket.id);
  });

  socket.on("send_message", async (data) => {
    const { senderId, receiverId, message } = data;

    try {
      const newMessage = await chatModel.create({
        senderId,
        receiverId,
        message,
      });

      const receiverSockets = users[receiverId] || new Set();

      receiverSockets.forEach((id) => {
        io.to(id).emit("receive_message", newMessage);
      });
    } catch (err) {
      console.log("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    for (let userId in users) {
      users[userId].delete(socket.id);

      if (users[userId].size === 0) {
        delete users[userId];
      }
    }
  });
});

connectdb()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("app is listing on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
