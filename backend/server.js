import express from "express";
const app=express()

import dotenv from "dotenv"
dotenv.config()
import connectdb from "./database.js";



app.get("/signin",async (req,res)=>{
    res.send("signin ...")
})



connectdb()
.then(()=>{
    app.listen (process.env.PORT,()=>{
    console.log("app is listing on port 3000")
    })
})
.catch(()=>{
    console.log("connection failed")
})