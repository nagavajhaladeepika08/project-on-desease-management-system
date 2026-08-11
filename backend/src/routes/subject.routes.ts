import { Router } from 'express';
import { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../controllers/subject.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/', auth, getAllSubjects);
router.get('/:id', auth, getSubjectById);
router.post('/', auth, authorize('admin'), createSubject);
router.put('/:id', auth, authorize('admin'), updateSubject);
router.delete('/:id', auth, authorize('admin'), deleteSubject);

export default router;