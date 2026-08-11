import { Router } from 'express';
import { getAllClasses, getClassById, createClass, updateClass, deleteClass } from '../controllers/class.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/', auth, getAllClasses);
router.get('/:id', auth, getClassById);
router.post('/', auth, authorize('admin'), createClass);
router.put('/:id', auth, authorize('admin'), updateClass);
router.delete('/:id', auth, authorize('admin'), deleteClass);

export default router;