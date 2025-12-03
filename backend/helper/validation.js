import mongoose from "mongoose";
import validator from "validator"
import usermodel from "../model/user.js";
import connectionrequestmodel from "../model/connectionrequest.js";

export const validatesignup=(req)=>{
    const {firstName,phoneNo,emailId,password}=req.body;
    if(!firstName){
        throw new Error("firstName is not valid")
    }else if(!validator.isEmail(emailId)){
        throw new Error("emailId is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("passwoed is not strong")
    }else if(!validator.isMobilePhone(phoneNo,"en-IN")){
        throw new Error("phone number is not valid")
    }
}

export const validateprofileedit=(req)=>{
    const allowedfield=["firstName","lastName","about","age","gender","skill","about"];
    const userupdateddata=req.body;
    const isvalidentity=Object.keys(userupdateddata).forEach((field)=>{
         allowedfield.includes(field)
    })
    return isvalidentity;
}

export const validatepasswordchange=(req)=>{
    const allowedfield=[currentpassword,newpassword];
    const userrequest=req.body;
    const isvalidrequest=Object.keys(userrequest).forEach((field)=>{
        allowedfield.includes(field)
    })
    return isvalidrequest
}

export const validaterequestsend=(status)=>{
   const allowedstatus=["intrested","ignored"]
   return allowedstatus.includes(status)
}

export const validateuserid=async(touserId)=>{
    if(!mongoose.Types.ObjectId.isValid(touserId)){
        throw new Error("invalid userId") 
    }else if(!await usermodel.findOne({_id:touserId})){
        throw new Error("the reciver with this userId donot exist")
    }
}

export const isconnectionalreadyestablished=async (fromuserId,touserId)=>{
    const connection= await connectionrequestmodel.findOne(
        {
            fromuserId:touserId,
            touserId:fromuserId
        }
    )
    return connection;
}
