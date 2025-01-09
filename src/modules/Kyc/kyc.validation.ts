import { body } from "express-validator";

export const validateKycUpdate = [
  body("status")
    .isIn(["Approved", "Rejected"])
    .withMessage("Invalid status. Allowed values are 'Approved' or 'Rejected'"),
];
