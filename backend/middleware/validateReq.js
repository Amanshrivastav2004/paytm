const { jwt, jwtkey } = require("../jwt/jwt")

function validateReq(req,res,next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        console.log("No authorization header found")
        return res.status(401).json({mssg: "Signup/Signin first"})
    }
    
    // Extract token - handle both "Bearer <token>" and direct token formats
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7, authHeader.length)
        : authHeader
    
    if (!token) {
        console.log("Token extraction failed")
        return res.status(401).json({mssg: "Token not provided"})
    }

    if (!jwtkey) {
        console.error("JWT_KEY environment variable is not set!")
        return res.status(500).json({mssg: "Server configuration error"})
    }
    
    try {
        console.log("Attempting to verify token...")
        const verified = jwt.verify(token, jwtkey) 
        console.log("Token verified successfully for userId:", verified.userId)

        req.userId = verified.userId
        next()
    } catch (error) {  //throws error if not verified
        console.log("Token verification failed:", error.message)
        console.log("Error name:", error.name)
        res.status(403).json({
            mssg: "INVALID TOKEN", 
            error: error.message,
            errorType: error.name
        })
    }
}

module.exports = validateReq