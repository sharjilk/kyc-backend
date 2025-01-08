import express, { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { KycRouter } from "../modules/Kyc/kyc.route";

const router: Router = express.Router();

router.use("/api/auth", AuthRouter);
router.use("/api/kyc", KycRouter);

export default router;
