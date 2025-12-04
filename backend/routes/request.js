import express from "express"
import userauth from "../middleware/jwt.js";
import {validaterequestsend,validateuserid,isconnectionalreadyestablished,validatereview} from "../helper/validation.js"
import connectionrequestmodel from "../model/connectionrequest.js";
import mongoose from "mongoose";
const requestRoute=express.Router();



requestRoute.post("/request/send/:status/:touserId",userauth,async(req,res)=>{
    try{
        const fromuserId=req.user._id;
        const {touserId,status}=req.params;
    
        if(!validaterequestsend(status,touserId)){
           throw new Error("invlid status");
        }
        await validateuserid(touserId)
        if(fromuserId.equals(touserId)){
            throw new Error("cannot send yourself request")
        }
        if(await isconnectionalreadyestablished(fromuserId,touserId)){
            throw new Error("cannot send request!! connection already established")
        }
        const isconnecionexist =await connectionrequestmodel.findOne({fromuserId,touserId});
        if(isconnecionexist){
            isconnecionexist.status=req.params.status;
            await isconnecionexist.save();
            return res.status(200).send("request updated")
        }

        const connection= new connectionrequestmodel({
           fromuserId,
           touserId,
           status
        })
        connection.save()

        res.status(200).send("connection send sucessfully")
    }catch(err){
        res.status(400).send("connection request failed"+err.message)
    }
})

requestRoute.post("/request/review/:status/:connectionId",userauth,async(req,res)=>{
    try{
        const {status,connectionId}=req.params;
        await validatereview(status);
        const connection=await connectionrequestmodel.findOne({
            _id:connectionId,
            touserId:req.user._id,
            status:"intrested"
        });
        if(!connection){
            throw new Error("invalid connectionId");
        }
        connection.status=status;
        connection.save();
        res.status(200).send("your review become successful");
    }catch(err){
        res.status(400).send("review failed "+err.message);
    }
})

export default requestRoute;