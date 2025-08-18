import express from "express";
import dotenv from 'dotenv';
import dbConnect from "./db/connect.js";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
dotenv.config();
const app=express();
const port=process.env.PORT;

dbConnect();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/auth",userRouter);

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});

