import mongoose, { Schema, Document } from "mongoose";

export interface ISetting extends Document {
  key: string;
  value: string;
  label?: string;
  group?: string;
}

const settingSchema = new Schema<ISetting>({
  key: { type: String, required: true, unique: true },
  value: { type: String, default: "" },
  label: { type: String },
  group: { type: String, default: "general" },
});


export const Setting = mongoose.model<ISetting>("Setting", settingSchema);
