import { Router } from 'express';
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, searchStudents } from '../controllers/student.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/', auth, getAllStudents);
router.get('/search', auth, searchStudents);
router.get('/:id', auth, getStudentById);
router.post('/', auth, authorize('admin'), createStudent);
router.put('/:id', auth, authorize('admin'), updateStudent);
router.delete('/:id', auth, authorize('admin'), deleteStudent);

export default router;