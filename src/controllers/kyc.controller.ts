import { Request, Response } from "express";
import { Kyc } from "../models";

export const KycSubmit = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).user;
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newKyc = new Kyc({
      userId: id,
      documentUrl: file.path,
      status: "Pending",
    });

    await newKyc.save();
    res
      .status(201)
      .json({ message: "KYC submitted successfully", data: newKyc });
  } catch (error) {
    res.status(500).json({ error: "Error submitting KYC" });
  }
};

export const KycUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedKYC = await Kyc.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedKYC) {
      return res.status(404).json({ error: "KYC not found" });
    }

    res.status(200).json({ message: "KYC status updated", kyc: updatedKYC });
  } catch (err) {
    res.status(500).json({ error: "Error updating KYC status" });
  }
};
