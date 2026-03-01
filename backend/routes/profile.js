import express from "express";
const profileRouter = express.Router();
import userauth from "../middleware/jwt.js";
import {
  validateprofileedit,
  validatepasswordchange,
} from "../helper/validation.js";
import usermodel from "../model/user.js";
import bcrypt from "bcrypt";

profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err });
  }
});

profileRouter.get("/profile/view/:id", userauth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await usermodel.findById(id).select("-password");
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ err });
  }
});

profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    // if (!validateprofileedit) {
    //   throw new Error("invalid entity to update");
    // }
    const loggedinuser = req.user;
    const updateddata = req.body;
    Object.keys(updateddata).forEach((field) => {
      loggedinuser[field] = updateddata[field];
    });
    await loggedinuser.save();
    res.status(200).json({ message: "data updated successfully" });
  } catch (err) {
    res.status(400).json({ err });
    console.log(err);
  }
});

profileRouter.patch("/profile/changepassword", userauth, async (req, res) => {
  try {
    if (!validatepasswordchange) {
      throw new Error("invalid password change request");
    }
    const loggedinuser = req.user;
    const currentpassword = req.body.currentpassword;
    const ispasswordcorrect =
      await loggedinuser.validatepassword(currentpassword);
    if (ispasswordcorrect) {
      const hashedpassword = await bcrypt.hash(req.body.newpassword, 10);
      await usermodel.updateOne(
        { emailId: req.user.emailId },
        { password: hashedpassword },
      );
    } else {
      throw new Error("invalid current password");
    }
    res.status(200).json({ message: "password change successful" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

export default profileRouter;
