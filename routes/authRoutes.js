const express = require("express");
const authControllers = require("../controllers/authController");
const validate = require("../middleware/validateMiddleware");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration (Returns Verification Token for API Testing)
router.route("/register").post(validate(signupSchema), authControllers.register);

// Email Verification (User clicks verification link with token)
router.route("/verify-email").get(authControllers.verifyEmail);

// User Login
router.route("/login").post(validate(loginSchema), authControllers.login);

// Get User Data (Protected Route)
//router.route("/user").get(authMiddleware, authControllers.getUser);

module.exports = router;
