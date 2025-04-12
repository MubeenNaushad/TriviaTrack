import { ForumCategory } from "../models/forumCategory.model.js";
import { ForumComment } from "../models/forumComment.model.js";
import { ForumPost } from "../models/forumPost.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await ForumCategory.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories: ", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .sort({ createdAt: -1 })
      .populate("author", "name photoUrl")
      .populate("category", "name slug description");

    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error fetching posts: ", error);
    return res.status(500).json({ message: "Error fetching posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, content, category } = req.body;
    const author = req.id;

    const newPost = new ForumPost({
      title,
      description,
      content,
      author,
      category,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error creating post: ", error);
    return res.status(500).json({ message: "Error creating post" });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await ForumCategory.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const CategoryPosts = await ForumPost.find({ category: category._id })
      .populate("author", "name photoUrl")
      .populate("category", "name slug description");

    return res.status(200).json({ category, CategoryPosts });
  } catch (error) {
    console.log("Error fetching posts by category: ", error);
    return res
      .status(500)
      .json({ message: "Error fetching posts by category" });
  }
};

export const getPostbyId = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findById(postId)
      .populate("author", "name photoUrl")
      .populate("category", "name slug description");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await ForumComment.find({ postId: post._id })
      .populate("author", "name photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({ post, comments });
  } catch (error) {
    console.log("Error fetching post by ID: ", error);
    return res.status(500).json({ message: "Error fetching post by ID" });
  }
};

export const AddCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const author = req.id;

    const newComment = new ForumComment({ postId, content, author, likes: 0 });

    await newComment.save();

    const post = await ForumPost.findById(postId);
    post.replies += 1;
    await post.save();

    return res.status(201).json(newComment);
  } catch (error) {
    console.log("Error adding comment to post: ", error);
    return res.status(500).json({ message: "Error adding comment to post" });
  }
};

export const AddLikeToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const author = req.id;

    const post = await ForumPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log("Error adding like to post: ", error);
    return res.status(500).json({ message: "Error adding like to post" });
  }
};
