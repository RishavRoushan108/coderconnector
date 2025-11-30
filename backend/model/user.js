import mongoose from "mongoose";
import validator, { isLowercase } from "validator"

const userschema=new mongoose.Schema(
    {
        firsName:{
            type:String,
            required:true,
            minlenght:5,
            maxlength:30,
            index:true
        },
        lastName:{
            type:String,
            required:false,
            minlenght:5,
            maxlength:30,
            index:true
        },
        email:{
            type:String,
            required:true,
            index:true,
            unique:true,
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
            default:indian
        }
    },
    {
        timestamps:true
    }
)

const usermodel=mongoose.model("user",userschema);

export default usermodel;