import { Router } from 'express';
import { markAttendance, getAttendanceByStudent, getMonthlyAttendance, getClassAttendance } from '../controllers/attendance.controller';
import { auth, authorize } from '../middleware/auth';

const router = Router();

router.post('/', auth, authorize('admin', 'teacher'), markAttendance);
router.get('/student/:studentId', auth, getAttendanceByStudent);
router.get('/monthly/:studentId', auth, getMonthlyAttendance);
router.get('/class/:classId', auth, authorize('admin', 'teacher'), getClassAttendance);

export default router;