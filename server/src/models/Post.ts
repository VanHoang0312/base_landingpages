import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  images?: string[];
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String },
    content: { type: String },
    thumbnail: { type: String },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

postSchema.index({ slug: 1 });
postSchema.index({ status: 1, publishedAt: -1 });

export const Post = mongoose.model<IPost>("Post", postSchema);
