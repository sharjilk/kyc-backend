import { Model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "User" | "Admin";
}

export interface UserModel extends Model<IUser> {
  isUserExist(_id: string): Promise<IUser>;
  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
}
