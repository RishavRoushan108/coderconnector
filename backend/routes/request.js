import express from "express"
import userauth from "../middleware/jwt.js";
import {validaterequestsend,validateuserid,isconnectionalreadyestablished} from "../helper/validation.js"
import connectionrequestmodel from "../model/connectionrequest.js";
const requestRoute=express.Router();



requestRoute.post("/request/send/:status/:touserId",userauth,async(req,res)=>{
    try{
        const fromuserId=req.user._id;
        const touserId=req.params.touserId;
        const status=req.params.status;
    
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


export default requestRoute;