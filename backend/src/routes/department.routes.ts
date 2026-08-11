import { Router } from 'express';
import { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } from '../controllers/department.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/', auth, getAllDepartments);
router.get('/:id', auth, getDepartmentById);
router.post('/', auth, authorize('admin'), createDepartment);
router.put('/:id', auth, authorize('admin'), updateDepartment);
router.delete('/:id', auth, authorize('admin'), deleteDepartment);

export default router;