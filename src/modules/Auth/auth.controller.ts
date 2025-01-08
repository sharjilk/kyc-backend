import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "./auth.interface";
import { AuthService } from "./auth.service";
import config from "../../util/config";

const AuthRegister = async (req: Request, res: Response) => {
  try {
    const userFormData: IUser = req.body;
    const user = await AuthService.createUser(userFormData);

    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      details: error.message || "Error registering user",
    });
  }
};

const AuthLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt_secret as string,
      { expiresIn: "6h" }
    );

    const responseData = {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in user",
      details: error,
    });
  }
};

export const AuthController = {
  AuthRegister,
  AuthLogin,
};
