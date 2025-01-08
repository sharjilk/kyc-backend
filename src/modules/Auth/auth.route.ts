import express, { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest.middleware";
import { registerUserValidation } from "./auth.validation";

const router: Router = express.Router();

/**
 * Register route
 */
router.post(
  "/register",
  validateRequest(registerUserValidation) as (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>,
  AuthController.AuthRegister as (req: Request, res: Response) => Promise<void>
);

/**
 * Login route
 */
router.post(
  "/login",
  AuthController.AuthLogin as (req: Request, res: Response) => Promise<void>
);

export { router as AuthRouter };
