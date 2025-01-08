import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "./auth.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser & Document;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.post("save", function (doc: IUser & Document, next) {
  doc.password = "";
  next();
});

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

userSchema.statics.isUserExist = async (_id: string) => {
  return await User.findOne({ _id }).select("+password");
};

userSchema.statics.isPasswordMatched = async (
  password: string,
  hashPassword: string
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
