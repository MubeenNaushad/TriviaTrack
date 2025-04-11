import mongoose from "mongoose";

const ForumPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ForumCategory" },
    likes: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ForumPost = mongoose.model("ForumPost", ForumPostSchema);
