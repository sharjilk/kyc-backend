import express, { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { verifyToken, isAdmin } from "../../middleware/auth.middleware";
import { KycController } from "./kyc.controller";
import { cloudinary } from "../../util/cloudinary.config";
import { validateKycUpdate } from "./kyc.validation";
import { validateRequest } from "../../middleware/validateRequest.middleware";

const router: Router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kyc-documents",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  } as any,
});

const upload = multer({ storage });

router.post(
  "/submit",
  verifyToken,
  upload.single("document"),
  KycController.KycSubmit as (req: Request, res: Response) => Promise<void>
);

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateRequest(validateKycUpdate) as (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>,
  KycController.KycUpdate as (req: Request, res: Response) => Promise<void>
);

export { router as KycRouter };
