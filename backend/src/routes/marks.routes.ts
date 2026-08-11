import { Router } from 'express';
import { addMarks, getMarksByStudent, updateMarks, getMarksByExam } from '../controllers/marks.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.post('/', auth, authorize('admin', 'teacher'), addMarks);
router.get('/student/:studentId', auth, getMarksByStudent);
router.get('/exam/:exam', auth, getMarksByExam);
router.put('/:id', auth, authorize('admin', 'teacher'), updateMarks);

export default router;