import { ForumCategory } from "../models/forumCategory.model.js";
import { ForumPost } from "../models/forumPost.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await ForumCategory.find().sort({ createdAt: -1});
        res.status(200).json(categories);

    } catch(error) {
        console.log("Error fetching categories: ", error);
        res.status(500).json({ message: "Error fetching categories" });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ createdAt: -1}).populate("author", "name photoUrl").populate("category", "name slug description");

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error fetching posts: ", error);
        return res.status(500).json({ message: "Error fetching posts" });
    }
}


export const getPostsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;

        const category = await ForumCategory.findOne({ slug });

        if(!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const CategoryPosts = await ForumPost.find({ category: category._id }).populate("author", "name photoUrl").populate("category", "name slug description");

        return res.status(200).json(category, CategoryPosts);

    } catch (error) {

        console.log("Error fetching posts by category: ", error);
        return res.status(500).json({ message: "Error fetching posts by category" });
    }
}