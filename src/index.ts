import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.route";
import { KycRouter } from "./routes/kyc.route";

const app: Application = express();
const port = process.env.PORT || 3000;

/*
 * Middlewares
 */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/*
 * Routes
 */
app.use("/api/auth", AuthRouter);
app.use("/api/kyc", KycRouter);

/**
 * Default route
 */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "This is default route",
  });
});

export default app;
