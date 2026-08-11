import { Router } from 'express';
import { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/', auth, getAllTeachers);
router.get('/:id', auth, getTeacherById);
router.post('/', auth, authorize('admin'), createTeacher);
router.put('/:id', auth, authorize('admin'), updateTeacher);
router.delete('/:id', auth, authorize('admin'), deleteTeacher);

export default router;