import mongoose, { Schema, type Model } from "mongoose";

export interface IOtpCode {
  phone: string;
  codeHash: string;
  expiresAt: Date;
  lastSentAt: Date;
}

const OtpCodeSchema = new Schema<IOtpCode>(
  {
    phone: { type: String, required: true, index: true },
    codeHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    lastSentAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const OtpCode: Model<IOtpCode> =
  mongoose.models.OtpCode ?? mongoose.model<IOtpCode>("OtpCode", OtpCodeSchema);

export default OtpCode;
