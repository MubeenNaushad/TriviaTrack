import express from "express";
import { getAllCategories, getAllPosts, getPostsByCategory } from "../controllers/forum.controller.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);

router.get("/all-categories", getAllCategories);

router.get("/posts-by-category/:slug", getPostsByCategory);

export default router;