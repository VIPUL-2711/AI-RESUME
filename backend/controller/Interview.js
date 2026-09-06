const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/Report");
const { generateInterviewReport, generateResumePdf } = require("../services/Ai.services");
exports.InterviewController =async (req,res) =>{
   try {
    const parser = new pdfParse.PDFParse({ data: Uint8Array.from(req.file.buffer) })
    const resumeContent = await parser.getText()
    await parser.destroy() // frees the underlying worker/doc — good hygiene per the library's own API
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    console.log("AI REPORT:", interViewReportByAi);
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"error occurd"
    })
   }
}

exports.getInterviewReportByIdController=async(req,res)=>{
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}
//get all interviews reports of user 
exports.getAllInterviewReportsControlle=async(req, res)=>{
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}
// controller for resume pdf =
exports.generateResumePdfController= async (req, res) =>{
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}