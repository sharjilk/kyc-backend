import mongoose, { Schema, Document, Model } from "mongoose";
import { IKyc, KycModel } from "./kyc.interface";

const kycSchema = new Schema<IKyc, KycModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    documentUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Kyc = mongoose.model<IKyc, KycModel>("Kyc", kycSchema);
