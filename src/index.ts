import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./routes/routes";

const app: Application = express();

/*
 * Middlewares
 */
app.use(express.json());
app.use(
  cors({
    origin: "*", // For development
    credentials: true,
  })
);

/*
 * Apply all Routes
 */
app.use("/", routes);

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
