import express from 'express';
import { createcourse, getcourse, updatecourse, deletecourse, getspecificcourse,getcoursebyid, createLecture, getCourseLecture, editLecture, removeLecture, getLecturebyId, searchCourse} from '../controllers/course.controller.js';
import { verifyUserMiddleware } from '../middleware/auth.middleware.js';
import StudentModel from '../models/user.model.js';
import upload from '../utils/multer.js'; 

const router = express.Router();

router.post('/create',verifyUserMiddleware, createcourse);
router.get('/getcourse',getcourse);
router.get('/getcourse/:id',getcoursebyid);

router.put('/update/:id',upload.single("courseThumbnail"),updatecourse);
router.delete('/delete/:id',deletecourse);
router.get('/getonecourse/:id',getspecificcourse);
router.get('/search', searchCourse);

router.post('/:courseId/lecture', createLecture);
router.get('/:courseId/lecture', getCourseLecture);
router.patch('/:courseId/lecture/:lectureId',editLecture);
router.delete('/:courseId/lecture/:lectureId', removeLecture);
router.get('/lecture/:lectureId', getLecturebyId);



export default router;
