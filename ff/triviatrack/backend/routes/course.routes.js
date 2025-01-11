import express from 'express';
import { createcourse } from '../controllers/course.controller.js';
import { getCategory, addCategory, getCategories } from '../controllers/category.controller.js';
import { getTopic, addTopic, getTopics } from '../controllers/topic.controller.js';
import { getComment, addComment, replyToComment } from '../controllers/comment.controller.js';
import { verifyUserMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Maintain original course creation route with user verification
router.post('/', verifyUserMiddleware, createcourse);

// Category routes within a course
router.post('/:courseId/categories', verifyUserMiddleware, addCategory);
router.get('/:courseId/categories', getCategories);
router.get('/:courseId/categories/:categoryId', getCategory);

// Topic routes within a category
router.post('/:courseId/categories/:categoryId/topics', verifyUserMiddleware, addTopic);
router.get('/:courseId/categories/:categoryId/topics', getTopics);
router.get('/:courseId/categories/:categoryId/topics/:topicId', getTopic);

// Comment and reply routes within a topic
router.post('/:courseId/categories/:categoryId/topics/:topicId/comments', verifyUserMiddleware, addComment);
router.post('/:courseId/categories/:categoryId/topics/:topicId/comments/:commentId/reply', verifyUserMiddleware, replyToComment);
router.get('/:courseId/categories/:categoryId/topics/:topicId/comments', getComment);

export default router;
