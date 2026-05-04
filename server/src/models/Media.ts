import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  url: string;
  mimetype: string;
  size: number;
  createdAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    originalName: { type: String },
    url: { type: String, required: true },
    mimetype: { type: String },
    size: { type: Number },
  },
  { timestamps: true }
);

export const Media = mongoose.model<IMedia>("Media", mediaSchema);
