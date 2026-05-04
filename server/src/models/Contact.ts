import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: "NEW" | "READ" | "REPLIED";
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["NEW", "READ", "REPLIED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
