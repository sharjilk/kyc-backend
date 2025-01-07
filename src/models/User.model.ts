import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "User" | "Admin";
  kycStatus: "Pending" | "Approved" | "Rejected";
}

const userSchema = new Schema<User>(
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
    kycStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
