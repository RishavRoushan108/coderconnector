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
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// const users = {}; // { userId: socketId }

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // register user
//   socket.on("register", (userId) => {
//     users[userId] = socket.id;
//   });

//   // send message (ONLY between 2 users)
//   socket.on("send_message", async (data) => {
//     const { senderId, receiverId, message } = data;

//     try {
//       const newMessage = await chatModel.create({
//         fromuserId: senderId,
//         touserId: receiverId,
//         message,
//       });

//       const receiverSocket = users[receiverId];

//       if (receiverSocket) {
//         io.to(receiverSocket).emit("receive_message", newMessage);
//       }
//     } catch (err) {
//       console.log("Error saving message:", err);
//     }

//     const receiverSocket = users[receiverId];

//     if (receiverSocket) {
//       io.to(receiverSocket).emit("receive_message", {
//         senderId,
//         message,
//       });
//     }
//   });

//   // remove user on disconnect
//   socket.on("disconnect", () => {
//     for (let userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//         break;
//       }
//     }
//   });
// });

connectdb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("app is listing on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed");
  });
