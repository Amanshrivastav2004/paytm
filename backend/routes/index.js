const express = require("express")
const router = express.Router()
const z = require("zod")
const userrouter = require("./user")
const accountrouter = require("./account")

// Health check endpoint to verify environment variables
router.get("/health", (req, res) => {
    const envStatus = {
        JWT_KEY_EXISTS: !!process.env.JWT_KEY,
        MONGO_URL_EXISTS: !!process.env.MONGO_URL,
        timestamp: new Date().toISOString()
    }
    res.json({
        status: "Server is running",
        environment: envStatus
    })
})

router.use("/user", userrouter)
router.use("/account", accountrouter)


module.exports = router
