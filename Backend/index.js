const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser')
const router = require('./routes')

const app = express();
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use("/api", router)


const PORT = 8000 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,(req, res)=>{
        console.log("Connect to DB")
        console.log(`Server is running on Port ${PORT}`)
    })
})
