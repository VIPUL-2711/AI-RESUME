const express = require("express");
const { Authuser } = require("../middleware/Auth");
const interviewController = require("../controller/Interview");
const interviewRouter = express.Router();
const upload = require("../middleware/File");
// const interviewReportModel = require("../models/Report");
//to create interview repot route
interviewRouter.post("/",Authuser,upload.single("resume"),interviewController.InterviewController)

// get interviewreport route by interviewID 
interviewRouter.get("/report/:interviewId",Authuser,interviewController.getInterviewReportByIdController)
 

// get interview report of logged in user 
interviewRouter.get("/",Authuser,interviewController.getAllInterviewReportsControlle)

// generate resume pdf route
interviewRouter.post("/resume/pdf/:interviewReportId",Authuser,interviewController.generateResumePdfController)

module.exports=interviewRouter; 