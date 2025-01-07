import express, { Request, Response, Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";
import { KycSubmit, KycUpdate } from "../controllers/kyc.controller";
import dotenv from "dotenv";

const router: Router = express.Router();

dotenv.config();

/**
 * Configure Cloudinary
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  KycSubmit as (req: Request, res: Response) => Promise<void>
);

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  KycUpdate as (req: Request, res: Response) => Promise<void>
);

export { router as KycRouter };
