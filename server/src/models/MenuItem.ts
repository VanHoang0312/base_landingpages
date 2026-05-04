import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  price: number;
  salePrice?: number;
  categoryId: mongoose.Types.ObjectId;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  newArrival: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    longDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    thumbnail: { type: String },
    images: [{ type: String }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    newArrival: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuItemSchema.index({ slug: 1 });
menuItemSchema.index({ categoryId: 1 });
menuItemSchema.index({ isFeatured: 1 });

export const MenuItem = mongoose.model<IMenuItem>("MenuItem", menuItemSchema);
