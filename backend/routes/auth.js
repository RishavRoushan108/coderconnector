import express from "express";
const authRouter = express.Router();

import usermodel from "../model/user.js";

import bcrypt from "bcrypt";

import { validatesignup } from "../helper/validation.js";

authRouter.post("/signup", async (req, res) => {
  try {
    validatesignup(req);
    const {
      firstName,
      lastName,
      emailId,
      phoneNo,
      password,
      age,
      gender,
      photo,
      about,
      skills,
      nationality,
    } = req.body;
    const bcryptedpassword = await bcrypt.hash(password, 10);
    const user = new usermodel({
      firstName,
      lastName,
      emailId,
      phoneNo,
      password: bcryptedpassword,
      age,
      gender,
      photo,
      about,
      skills,
      nationality,
    });
    await user.save();

    res.status(200).send("you signup sucessfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("signup failed " + err.message);
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await usermodel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("account not found");
    }
    const ispasswordcorrect = await user.validatepassword(password);
    if (ispasswordcorrect) {
      const token = await user.JWT();
      res.cookie("token", token);
      res.status(200).json({ message: "login successfull", user });
    } else {
      throw new Error("invalid emailid or password");
    }
  } catch (err) {
    res.status(400).json("signin failed " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: "logout successful" });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default authRouter;
