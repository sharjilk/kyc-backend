import { body } from "express-validator";

export const registerUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["Admin", "User"])
    .withMessage("Invalid role. Allowed values: 'Admin', 'User'")
    .escape(),
];
