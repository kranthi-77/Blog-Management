const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "email must be at least of 3 characters" })
    .max(255, { message: "email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(3, { message: "username must be at lest of 3 characters" })
    .max(255, { message: "username must not be more than 255 characters" }),
});

module.exports = { signupSchema, loginSchema };