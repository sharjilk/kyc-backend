import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.route";
//import { KycRouter } from "./routes/kyc.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

/*
 * Middlewares
 */
app.use(cors());
app.use(express.json());

/*
 * Database Connection
 */
mongoose
  .connect(process.env.CONNECTION_URI || "")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

/*
 * Routes
 */
app.use("/api/auth", AuthRouter);
//app.use("/api/kyc", KycRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
