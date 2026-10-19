
const jwt = require("jsonwebtoken");
const blacklistToken = require("../models/blacklist");

exports.Authuser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in to continue"
            });
        }

        const isTokenBlacklisted = await blacklistToken.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token is no longer valid. Please log in again."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Authentication failed. Please log in again."
        });
    }
};
