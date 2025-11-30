import express from "express"
const authRouter=express.Router();

import usermodel from "../model/user.js";

import bcrypt from "bcrypt";

import {validatesignup} from "../helper/validation.js"

authRouter.post("/signup",async(req,res)=>{
    try{
       validatesignup(req)
       const {firstName,lastName,emailId,phoneNo,password}=req.body;
       const bcryptedpassword=await bcrypt.hash(password,10);
       
       const user=new usermodel({
        firstName,
        lastName,
        emailId,
        phoneNo,
        password:bcryptedpassword
       })
       await user.save()

       res.status(200).send("you signup sucessfully")
    }catch(err){
       res.status(400).send("signup failed "+err.message)
    }
})

authRouter.get("/signin",async(req,res)=>{
    try{
       const {emailId,password}=req.body;
       const user = await usermodel.findOne({emailId:emailId});
       if(!user){
        throw new Error("account not found");
       }
       const ispasswordcorrect=await user.validatepassword(password);
       if(ispasswordcorrect){
           const token=await user.JWT;
           res.cookie("token",token);
           res.status(200).send("login sucessful");
       }else{
        throw new Error("invalid emailid or password");
       }
    }catch(err){
       res.status(400).send("signin failed "+err.message)
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout sucessful");
})

export default authRouter;

