import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  database_url: process.env.CONNECTION_URI,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
