import { Kyc } from "./Kyc.model";
import { IKyc, IKycSubmit } from "./kyc.interface";

const submitKyc = async (kycData: IKycSubmit): Promise<IKycSubmit> => {
  try {
    const newKyc = new Kyc(kycData);
    return await newKyc.save();
  } catch (error) {
    console.error("Error submitting KYC:", error);
    throw new Error("Failed to submit kyc");
  }
};

const updateKycStatus = async (
  id: string,
  status: "Approved" | "Rejected"
): Promise<IKyc | null> => {
  try {
    return await Kyc.findByIdAndUpdate(id, { status }, { new: true });
  } catch (error) {
    console.error("Error updating KYC status:", error);
    throw new Error("Failed to update kyc status");
  }
};

export const KycService = {
  submitKyc,
  updateKycStatus,
};
