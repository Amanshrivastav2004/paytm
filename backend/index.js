require("dotenv").config()

const express = require("express")
const cors = require("cors")
const Router = require("./routes")
const app = express()

// Check for required environment variables
if (!process.env.JWT_KEY) {
    console.error("FATAL ERROR: JWT_KEY is not defined in environment variables")
}
if (!process.env.MONGO_URL) {
    console.error("FATAL ERROR: MONGO_URL is not defined in environment variables")
}

app.use(express.json())
app.use(cors({
    origin: '*', // In production, specify your frontend domain
    credentials: true,
    exposedHeaders: ['Authorization']
}))

app.use("/api/v1", Router)

app.use((err,req,res,next)=> {
    return res.json({
        err: err.message
    })
})
    
app.listen(3000)