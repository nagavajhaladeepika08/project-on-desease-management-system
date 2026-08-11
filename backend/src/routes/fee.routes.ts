import { Router } from 'express';
import { getFeeByStudent, addFee, updateFee, getFeeByStatus } from '../controllers/fee.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/student/:studentId', auth, getFeeByStudent);
router.get('/status/:status', auth, authorize('admin'), getFeeByStatus);
router.post('/', auth, authorize('admin'), addFee);
router.put('/:id', auth, authorize('admin'), updateFee);

export default router;