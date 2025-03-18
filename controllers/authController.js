const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email app password
  },
});

// ? Register User with Email Verification
const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const userExist = await User.findOne({ email });
  
      if (userExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Create new user
      const newUser = new User({ username, email, password, isVerified: false });
      await newUser.save();
  
      // Generate verification token
      const verificationToken = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      // API testing: Return the token instead of sending an email
      res.status(201).json({
        message: "User registered successfully. Use this token to verify email.",
        verificationToken, // <-- Copy this token and use it for verification
      });
  
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  
  // ? Verify Email (API Testing Version - Pass Token Manually)
  const verifyEmail = async (req, res) => {
    try {
      const { token } = req.query; // Get token from query params
  
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user and update verification status
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }
  
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
  
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  };

// ? Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    res.status(200).json({
      message: "Login Successful",
      token: await user.generateToken(),
      userId: user._id.toString(),
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ? Get User Info (Authenticated Route)
//const getUser = async (req, res) => {
//  try {
//  return res.status(200).json({ user: req.user });
 // } catch (error) {
//    res.status(500).json({ message: "Internal server error" });
//  }
//};


module.exports = { register, verifyEmail, login };
