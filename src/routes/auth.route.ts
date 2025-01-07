import express, { Request, Response, Router } from "express";
import { AuthLogin, AuthRegister } from "../controllers/auth.controller";

const router: Router = express.Router();

/**
 * Register route
 */
router.post(
  "/register",
  AuthRegister as (req: Request, res: Response) => Promise<void>
);

/**
 * Login route
 */
router.post(
  "/login",
  AuthLogin as (req: Request, res: Response) => Promise<void>
);

export { router as AuthRouter };
