const mongoose = require("mongoose")

require("dotenv").config()

if (!process.env.MONGO_URL) {
    console.error("FATAL ERROR: MONGO_URL is not defined in environment variables")
}

mongoose.connect(`${process.env.MONGO_URL}`, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log("✅ Connected to MongoDB successfully")
})
.catch((error) => {
    console.error("❌ MongoDB connection error:", error.message)
    console.error("Make sure MONGO_URL is set in Vercel environment variables")
})

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname : {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user",required: true },
    balance: { type:Number, required: true }
})

const User = mongoose.model("user",userSchema)
const Account = mongoose.model("account",accountSchema)

module.exports = { User,Account } 