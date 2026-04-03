import express from "express";
import userauth from "../middleware/jwt.js";
import connectionrequestmodel from "../model/connectionrequest.js";
import chatModel from "../model/chat.js";

const chatRouter = express.Router();

chatRouter.get("/chat/data/:id", userauth, async (req, res) => {
  try {
    const user = req.user;
    const selectedUser = req.params.id;
    const connection = await connectionrequestmodel.findOne({
      $or: [
        { fromuserId: user._id, touserId: selectedUser },
        { fromuserId: selectedUser, touserId: user._id },
      ],
      status: "accepted",
    });
    if (!connection) {
      return res.status(401).json({ message: "You are not connected" });
    }

    const messages = await chatModel
      .find({
        $or: [
          { senderId: user._id, receiverId: selectedUser },
          { senderId: selectedUser, receiverId: user._id },
        ],
      })
      .sort({ createdAt: 1 }); // oldest → newest

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

export default chatRouter;
