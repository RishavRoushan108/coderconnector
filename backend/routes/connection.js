import express from "express"
import userauth from "../middleware/jwt.js";
import connectionrequestmodel from "../model/connectionrequest.js";
const connectionRoute= express.Router()

connectionRoute.get("/user/request/recieved",userauth,async(req,res)=>{
    try{
        const connectionrecieved=await connectionrequestmodel.find({
            touserId:req.user._id,
            status:"intrested"
        }).populate("fromuserId", "firstName lastName")
        res.status(200).send("the request you receive are "+connectionrecieved)
    }catch(err){
        res.status(400).send("cannot get the connection request "+err.message)
    }
})

connectionRoute.get("/user/connection",userauth,async(req,res)=>{
    try{
        const connectionlist=await connectionrequestmodel.find({
            $or:[
                {fromuserId:req.user._id,status:"accepted"},
                {touserId:req.user._id,status:"accepted"}
            ]
        })
        .populate("fromuserId","firstName lastName")
        .populate("touserId", "firstName lastName");
    
        const data=connectionlist.map((row)=>{
            if(row.fromuserId._id.toString()===req.user._id.toString()){
                return row.touserId
            }else {
                return row.fromuserId
            }
        })

        res.status(200).send("list of your connection"+connectionlist)
    }catch(err){
        res.status(400).send("connot get the list of your connection "+err.message);
    }
})

export default connectionRoute;