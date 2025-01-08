import { body } from "express-validator";

// export const validateKycSubmit = [
//   body("document").notEmpty().withMessage("Document is required"),
// ];

export const validateKycUpdate = [
  body("status")
    .isIn(["Approved", "Rejected"])
    .withMessage("Invalid status. Allowed values are 'Approved' or 'Rejected'"),
];
