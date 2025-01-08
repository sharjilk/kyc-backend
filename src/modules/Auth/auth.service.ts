import { User } from "./auth.model";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";

const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists. Please use a different email.");
    }

    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "User",
    });

    return await user.save();
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log("user logged", user);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.error("Error during user authentication:", error);
    throw new Error("Invalid login credentials");
  }
};

export const AuthService = {
  createUser,
  loginUser,
};
