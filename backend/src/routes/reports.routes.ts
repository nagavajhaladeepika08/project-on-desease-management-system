import { Router } from 'express';
import { getStudentReport, getClassReport, getAttendanceReport, getPerformanceReport } from '../controllers/reports.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.get('/student/:studentId', auth, getStudentReport);
router.get('/class/:classId', auth, authorize('admin', 'teacher'), getClassReport);
router.get('/attendance', auth, authorize('admin'), getAttendanceReport);
router.get('/performance/:classId', auth, authorize('admin', 'teacher'), getPerformanceReport);

export default router;