import express from "express";
const app=express()

import dotenv from "dotenv"
dotenv.config()
import connectdb from "./database.js";

import cookieParser from "cookie-parser";
app.use(cookieParser())

app.use(express.json())


import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRoute from "./routes/request.js";
import connectionRoute from "./routes/connection.js";

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRoute)
app.use("/",connectionRoute)

connectdb()
.then(()=>{
    app.listen (process.env.PORT,()=>{
    console.log("app is listing on port 3000")
    })
})
.catch(()=>{
    console.log("connection failed")
})