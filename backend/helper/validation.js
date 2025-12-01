import validator from "validator"

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
