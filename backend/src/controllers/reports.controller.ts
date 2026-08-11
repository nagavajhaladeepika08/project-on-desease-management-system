import { Response } from 'express';
import Student from '../models/Student';
import Attendance from '../models/Attendance';
import Marks from '../models/Marks';
import Fee from '../models/Fee';
import { AuthRequest } from '../types';

export const getStudentReport = async (req: AuthRequest, res: Response) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .populate('user')
      .populate('department')
      .populate('class');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const attendance = await Attendance.find({ student: req.params.studentId });
    const marks = await Marks.find({ student: req.params.studentId });
    const fees = await Fee.find({ student: req.params.studentId });

    const report = {
      student,
      attendance: {
        total: attendance.length,
        present: attendance.filter(a => a.status === 'present').length,
        absent: attendance.filter(a => a.status === 'absent').length,
        percentage: attendance.length > 0 ? ((attendance.filter(a => a.status === 'present').length / attendance.length) * 100).toFixed(2) : 0
      },
      academic: {
        totalExams: marks.length,
        averagePercentage: marks.length > 0 ? (marks.reduce((sum, m) => sum + m.percentage, 0) / marks.length).toFixed(2) : 0,
        marks: marks
      },
      fees: {
        total: fees.length,
        pending: fees.filter(f => f.status === 'pending').length,
        paid: fees.filter(f => f.status === 'paid').length,
        overdue: fees.filter(f => f.status === 'overdue').length
      }
    };

    res.json({ report });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassReport = async (req: AuthRequest, res: Response) => {
  try {
    const students = await Student.find({ class: req.params.classId });
    const studentIds = students.map(s => s._id);

    const totalStudents = students.length;
    const attendance = await Attendance.find({ student: { $in: studentIds } });
    const marks = await Marks.find({ student: { $in: studentIds } });
    const fees = await Fee.find({ student: { $in: studentIds } });

    const report = {
      class: req.params.classId,
      totalStudents,
      students: students,
      attendance: {
        averageAttendance: attendance.length > 0 ? ((attendance.filter(a => a.status === 'present').length / attendance.length) * 100).toFixed(2) : 0
      },
      marks: {
        averagePercentage: marks.length > 0 ? (marks.reduce((sum, m) => sum + m.percentage, 0) / marks.length).toFixed(2) : 0
      },
      fees: {
        paidCount: fees.filter(f => f.status === 'paid').length,
        pendingCount: fees.filter(f => f.status === 'pending').length,
        overdueCount: fees.filter(f => f.status === 'overdue').length
      }
    };

    res.json({ report });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendanceReport = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, classId } = req.query;

    let filter: any = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    if (classId) filter.class = classId;

    const attendance = await Attendance.find(filter)
      .populate('student')
      .populate('class')
      .sort({ date: -1 });

    const stats = {
      total: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      leave: attendance.filter(a => a.status === 'leave').length
    };

    res.json({ attendance, stats });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPerformanceReport = async (req: AuthRequest, res: Response) => {
  try {
    const students = await Student.find({ class: req.params.classId });
    const studentIds = students.map(s => s._id);

    const marks = await Marks.find({ student: { $in: studentIds } })
      .populate('student')
      .populate('subject');

    const studentPerformance = students.map(student => {
      const studentMarks = marks.filter(m => m.student._id.toString() === student._id.toString());
      const averagePercentage = studentMarks.length > 0
        ? studentMarks.reduce((sum, m) => sum + m.percentage, 0) / studentMarks.length
        : 0;

      return {
        student: student.name,
        rollNumber: student.rollNumber,
        averagePercentage: averagePercentage.toFixed(2),
        totalExams: studentMarks.length,
        marks: studentMarks
      };
    });

    res.json({ performance: studentPerformance });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};