import mongoose, { Schema, Document } from "mongoose";

interface Kyc extends Document {
  userId: mongoose.Types.ObjectId;
  documentUrl: string;
  status: "Pending" | "Approved" | "Rejected";
}

const kycSchema = new Schema<Kyc>(
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

export default mongoose.model<Kyc>("Kyc", kycSchema);
