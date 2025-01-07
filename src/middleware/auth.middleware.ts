import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

/**
 * Verify Token
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};

/**
 * Check Admin role
 */
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || typeof req.user === "string" || req.user.role !== "Admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  next();
};
