import { Request, Response } from "express";
import { KycService } from "./kyc.service";
import mongoose from "mongoose";

const KycSubmit = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { file } = req;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated." });
    }

    const newKyc = await KycService.submitKyc({
      userId: new mongoose.Types.ObjectId(userId),
      documentUrl: file?.path,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: newKyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting KYC",
      details: error,
    });
  }
};

const KycUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedKYC = await KycService.updateKycStatus(id, status);
    if (!updatedKYC) {
      return res.status(404).json({ success: false, error: "KYC not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "KYC status updated", kyc: updatedKYC });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating KYC status",
      details: error,
    });
  }
};

const getKycStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated." });
    }

    const kycStatus = await KycService.getKycStatus(userId);

    if (!kycStatus) {
      return res.status(404).json({ status: null });
    }

    res.status(200).json({ status: kycStatus });
  } catch (error) {
    console.error("Error fetching KYC status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching KYC status",
      details: error,
    });
  }
};

const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await KycService.getAllKycSubmissions();

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching all submissions:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all submissions",
      details: error,
    });
  }
};

export const KycController = {
  KycSubmit,
  KycUpdate,
  getKycStatus,
  getAllSubmissions,
};
