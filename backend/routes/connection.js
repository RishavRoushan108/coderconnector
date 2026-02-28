import express from "express";
import userauth from "../middleware/jwt.js";
import connectionrequestmodel from "../model/connectionrequest.js";
import { set } from "mongoose";
import usermodel from "../model/user.js";
const connectionRoute = express.Router();

const SAVE_DATA =
  "firstName lastName emailId phoneNo photo age gender about skills nationality";

connectionRoute.get("/user/request/recieved", userauth, async (req, res) => {
  try {
    const connectionrecieved = await connectionrequestmodel
      .find({
        touserId: req.user._id,
        status: "intrested",
      })
      .populate("fromuserId", "firstName lastName age gender photo about");
    res.status(200).json({ connectionrecieved });
  } catch (err) {
    res.status(400).json({ err });
  }
});

connectionRoute.get("/user/connection", userauth, async (req, res) => {
  try {
    const connectionlist = await connectionrequestmodel
      .find({
        $or: [
          { fromuserId: req.user._id, status: "accepted" },
          { touserId: req.user._id, status: "accepted" },
        ],
      })
      .populate("fromuserId", "firstName lastName")
      .populate("touserId", "firstName lastName");

    const data = connectionlist.map((row) => {
      if (row.fromuserId._id.toString() === req.user._id.toString()) {
        return row.touserId;
      } else {
        return row.fromuserId;
      }
    });

    res.status(200).send("list of your connection" + connectionlist);
  } catch (err) {
    res
      .status(400)
      .send("connot get the list of your connection " + err.message);
  }
});

connectionRoute.get("/user/feed", userauth, async (req, res) => {
  try {
    const loggedinuser = req.user;
    const connectedpeople = await connectionrequestmodel.find({
      $or: [{ fromuserId: loggedinuser._id }, { touserId: loggedinuser._id }],
    });
    const excludefromfeed = new Set();
    connectedpeople.forEach((obj) => {
      excludefromfeed.add(obj.fromuserId.toString());
      excludefromfeed.add(obj.touserId.toString());
    });
    const user = await usermodel
      .find({
        $and: [
          { _id: { $nin: Array.from(excludefromfeed) } },
          { _id: { $ne: loggedinuser._id } },
        ],
      })
      .select(SAVE_DATA);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err });
  }
});

export default connectionRoute;
