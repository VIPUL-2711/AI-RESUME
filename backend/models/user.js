const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    unique:[true ,"user already created"],
    required:true
  },
  email:{
    type:String,
    unique:[true,"already exist a user related to this email"],
    required:true
  },
  password:{
    type:String,
    required:true
  },
})
module.exports=mongoose.model("user",UserSchema);