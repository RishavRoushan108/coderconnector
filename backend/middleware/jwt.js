import jwt from "jsonwebtoken"
import usermodel from "../model/user.js"
import dotenv from "dotenv"
dotenv.config()


const userauth= async (req,res,next)=>{
    try{
    const cookies=req.cookies;
    const {token}=cookies;

    if (!token){
        res.send("invalid token");
    }
    const decryptmessage = await jwt.verify(token,process.env.TOKEN_SECRET_CODE);
    const {_id}=decryptmessage;
    const user=await usermodel.findOne({_id:_id})
    if (!user){
        throw new Error("user not found");
    }
    req.user=user;
    next()
    }catch(err){
        res.status(400).send(err.message);
    }
}

export default userauth;