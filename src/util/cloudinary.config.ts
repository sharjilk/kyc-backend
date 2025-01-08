import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();

/**
 * Configure Cloudinary
 */
cloudinary.config({
  cloud_name: config.cloudinary_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

export { cloudinary };
