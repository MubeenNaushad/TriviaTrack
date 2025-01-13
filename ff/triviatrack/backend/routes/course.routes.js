import express from 'express';
import { createcourse, getcourse, updatecourse, deletecourse, getcoursebyid } from '../controllers/course.controller.js';
import { verifyUserMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create',createcourse);
router.get('/getcourse',getcourse);
router.get('/getcourse/:id',getcoursebyid);

router.put('/update/:id',updatecourse);
router.delete('/delete/:id',deletecourse);

export default router;
