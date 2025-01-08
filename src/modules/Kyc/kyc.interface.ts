import mongoose from "mongoose";

export interface IKyc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  documentUrl: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface IKycSubmit {
  userId: mongoose.Types.ObjectId;
  documentUrl: string | undefined;
  status: "Pending" | "Approved" | "Rejected";
}

export interface IKycUpdate {
  id: string;
  status: "Approved" | "Rejected";
}

export interface KycModel extends mongoose.Model<IKyc> {
  findByUserId(userId: mongoose.Types.ObjectId): Promise<IKyc | null>;
  updateStatus(
    kycId: string,
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<IKyc>;
}
