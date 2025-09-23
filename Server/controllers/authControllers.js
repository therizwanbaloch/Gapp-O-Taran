const jwt = require("jsonwebtoken");
const User = require('../models/user.js')
const bcrypt = require("bcryptjs")

// creating register route here........................ 

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });


    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// creating Login route here........................

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET
    const token = jwt.sign(
      { id: user._id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" } 
    );

    
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token, 
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// creating getUserInfo route here........................

exports.getUser = async (req, res,) => {
    const userInfo = await User.findById(req.user.id).select("-password")
}