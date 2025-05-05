import express from "express";
import {
  AddCommentToPost,
  createPost,
  getAllCategories,
  getAllPosts,
  getPostbyId,
  getPostsByCategory,
  searchPosts,
} from "../controllers/forum.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);

router.get("/all-categories", getAllCategories);

router.get("/categories/:slug", getPostsByCategory);

router.post("/create-post", verifyUserMiddleware, createPost);

router.get("/posts/:postId", getPostbyId);

router.get("/search-posts",  searchPosts);

router.post(
  "/posts/:postId/add-comment",
  verifyUserMiddleware,
  AddCommentToPost
);

export default router;
