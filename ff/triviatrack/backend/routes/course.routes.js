import express from 'express';
import { createcourse, getcourse, updatecourse, deletecourse,getcoursebyid, createLecture, getCourseLecture, editLecture, removeLecture, getLecturebyId, searchCourse, getStudentsByCourse} from '../controllers/course.controller.js';
import { verifyUserMiddleware } from '../middleware/auth.middleware.js';
import StudentModel from '../models/user.model.js';
import upload from '../utils/multer.js'; 

const router = express.Router();

router.post('/create',verifyUserMiddleware, createcourse);
router.get('/getcourse',getcourse);
router.get('/getcourse/:id',getcoursebyid);

router.put('/update/:id',upload.single("courseThumbnail"),updatecourse);
router.delete('/delete/:id',deletecourse);
router.get('/:courseId/students',verifyUserMiddleware, getStudentsByCourse);
router.get('/search', searchCourse); 

router.post('/:courseId/lecture', createLecture);
router.get('/:courseId/lecture', getCourseLecture);
router.patch('/:courseId/lecture/:lectureId',editLecture);
router.delete('/:courseId/lecture/:lectureId', removeLecture);
router.get('/lecture/:lectureId', getLecturebyId);



export default router;
