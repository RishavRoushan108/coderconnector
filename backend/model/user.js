import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

import dotenv from "dotenv"
dotenv.config()

const userschema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            minlenght:5,
            maxlength:30
        },
        lastName:{
            type:String,
            minlenght:5,
            maxlength:30
        },
        emailId:{
            type:String,
            required:true,
            unique:true, // it automatically make index of emailId
            lowercase:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid email");
                }
            }
        },
        password:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("enter strong password")
                }
            }
        },
        phoneNo:{
            type:String,
            required:true,
            index:true,
            validate(value){
                if(!validator.isMobilePhone(value,"en-IN")){
                    throw new Error("enter valid phoneNumber")
                }
            }
        },
        age:{
            type:Number,
            min:18
        },
        gender:{
            type:String,
            validate(value){
                if(![male,female,other].includes(value)){
                    throw new Error("gender data is not valid")
                }
            }
        },
        photo:{
            type:String,
            validate(value){
                if(validator.isURL(value)){
                    throw new Error("invalid photo url address"+value)
                }
            }
        },
        about:{
            type:String
        },
        skills:{
            type:[String]
        },
        nationality:{
            type:String,
            default:"indian"
        }
    },
    {
        timestamps:true
    }
)

userschema.methods.validatepassword=async function (password) {
    const user=this;
    const hashedpassword=user.password
    return await bcrypt.compare(password,hashedpassword);
}

userschema.methods.JWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},process.env.TOKEN_SECRET_CODE,{expiresIn:"7d"})
    return token
}

const usermodel=mongoose.model("user",userschema);

export default usermodel;