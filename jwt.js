const jwt  = require("jsonwebtoken")

const jwtauthMiddlewear = (req,res,next)=>{
    const authorization = req.headers.authorization
    if(!authorization)return res.status(401).json({error:"Token not found"})

        const token = req.headers.authorization.split(" ")[1]
        if(!token)return res.status(401).json({error:"Unauthorized"})

            try {
                const decode = jwt.verify(token,process.env.JWT_Secret)
                req.user = decode
                next()
                
            } catch (error) {
                console.log(err)
                res.status(401).json({error:"Invalid token"})
            }
}

const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_Secret)
}

module.exports = {jwtauthMiddlewear,generateToken}