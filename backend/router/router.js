const express=require("express");
const { registerController, logIn, logout, GetmeContoller } = require("../controller/Auth");
const router =express.Router();
const { Authuser } =require("../middleware/Auth");


router.post("/register",registerController);
router.post("/login",logIn);
router.get("/logout",logout);
router.get("/getAll",Authuser,GetmeContoller);
module.exports=router;