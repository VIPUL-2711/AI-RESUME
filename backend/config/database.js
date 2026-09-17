const mongoose=require("mongoose");
require("dotenv").config();
exports.ConnectDb = ()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("Database is connected successfully")
  })
  .catch((error)=>{
    console.log("Database is not connected");
    console.error(error);
    process.exit(1);
  })
}