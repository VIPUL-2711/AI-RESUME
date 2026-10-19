
const express = require("express");
const { ConnectDb } = require("../backend/config/database");
const router = require("../backend/router/router");
const interviewRouter = require("./router/interview");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-resume-frontend-2b51.onrender.com"
    ],
    credentials: true
}));

app.use(cookieParser());

// Database
ConnectDb();

// Routes
app.use("/api/auth", router);
app.use("/api/interview", interviewRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Resume backend is running!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is initiated on port ${PORT}`);
});
