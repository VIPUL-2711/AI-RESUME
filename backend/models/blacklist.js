const mongoose=require("mongoose");

const blacklistToken=new mongoose.Schema({
  token:{
    type: String,
    required:[true,"token need to added for blacklisting"]
  }
},{
  timestamps:true
})

module.exports =mongoose.model("blacklistokens",blacklistToken)