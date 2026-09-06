const express=require("express");
const { ConnectDb } = require("../backend/config/database");
const router = require("../backend/router/router");
const interviewRouter= require("./router/interview");
const cors= require("cors")
const app = express();
//middleware
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", //  server's origin
  credentials: true
}));
app.use(cookieParser())
require("dotenv").config();
//database 
ConnectDb();
// routes 
app.use("/api/auth",router);
app.use("/api/interview",interviewRouter);

//app listen 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is initiated on port ${PORT}`);
});