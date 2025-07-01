import express from 'express';
import {
  getTeacherProfile,
  getPublicTeacherProfile,
  updateTeacherProfile,
  uploadProfilePhoto,
  getTeacherStats,
  searchTeachers,
  testTeacherAuth
} from '../controllers/teacherProfile.controller.js';
import { verifyUserMiddleware } from '../middleware/auth.middleware.js';
import multer from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// Public routes
router.get('/search', searchTeachers);
router.get('/public/:teacherId', getPublicTeacherProfile);

// Protected routes (require authentication)
router.use(verifyUserMiddleware);

// Get current teacher's profile
router.get('/profile', getTeacherProfile);

// Update teacher profile
router.put('/profile', updateTeacherProfile);

// Get teacher statistics
router.get('/stats', getTeacherStats);

// Test teacher authentication
router.get('/test-auth', testTeacherAuth);

// Upload profile photo
router.post('/upload-photo', multer.single('profilePhoto'), async (req, res, next) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'teacher-profiles',
        transformation: [
          { width: 400, height: 400, crop: 'fill' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
      req.file.path = result.secure_url;
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
}, uploadProfilePhoto);

export default router;
