const jwt = require("jsonwebtoken");
const blacklistToken = require("../models/blacklist")
exports.Authuser = async (req,res,next) =>{
  const token = req.cookies.token;

  if(!token){
    return res.status(400).json({
      success:false,
      messsage:"token is not provided "
    })
  }

  const isTokenBlacklisted= await blacklistToken.findOne({token}) 
    if (isTokenBlacklisted) {
    return res.status(401).json({
      success: false,
      message: "Token is no longer valid, please log in again"
    })
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    
    req.user =decoded
    next();
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"token is not valid "
    })
  }
}