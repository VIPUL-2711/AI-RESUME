const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const blacklist=require("../models/blacklist")

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check whether user already exists
    const isUserAlreadyExist = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists"
      });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const createUser = await User.create({
      username,
      email,
      password: hash
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: createUser._id,
        username: createUser.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Store JWT in cookie
    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: createUser._id,
        username: createUser.username,
        email: createUser.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
};


exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Store JWT in cookie
    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

exports.logout = async (req,res) =>{
  const token = req.cookies.token;

  if(token){
    await blacklist.create({ token })
  }
  res.clearCookie("token")

  return res.status(200).json({
    success:true,
    message:"User logged out succesfully"
  })
}

exports.GetmeContoller = async (req,res) =>{
  const user  =  await User.findById(req.user.id);
  
  return res.status(200).json({
    success:true,
    message:"user details fetched successfully",
    user:{
      id: user._id,
      username:user.username,
      email:user.email
    }
  })
}