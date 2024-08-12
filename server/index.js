import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config()


const app=express()
app.use(express.json())
app.use(cors())

import {postSignup, postLogin} from "./controllers/user.js";
import { postTransaction, getTransactions, deleteTransaction } from "./controllers/Transactions.js ";

const connectDB=async()=>{
    const conn= await mongoose.connect(process.env.MongoDB_URL)
    if(conn){
        console.log(`MongoDB Database Connected😊`)
    }else{
        console.log(`Check your connectivity📞`)
    }
}
connectDB()



app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"Sever is healthy"
    })
})

app.post("/signup", postSignup)
app.post("/login", postLogin)

app.post("/transaction", postTransaction)
app.get("/transactions", getTransactions)
app.delete("/transaction/:id", deleteTransaction)


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`The Sever is running on ${PORT}`)
})

