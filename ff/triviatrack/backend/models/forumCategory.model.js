import mongoose from "mongoose";

const ForumCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String },
  bgColor: { type: String },
  postCount: { type: Number, default: 0 },
  userCount: { type: Number, default: 0 },
}, { timestamps: true });

export const ForumCategory = mongoose.model("ForumCategory", ForumCategorySchema);
