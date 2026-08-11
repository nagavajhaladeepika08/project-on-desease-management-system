import { Response } from 'express';
import Attendance from '../models/Attendance';
import { AuthRequest } from '../types';

export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { student, class: classId, date, status, remarks } = req.body;

    const attendance = new Attendance({
      student,
      class: classId,
      date,
      status,
      remarks
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendanceByStudent = async (req: AuthRequest, res: Response) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId })
      .populate('student')
      .populate('class')
      .sort({ date: -1 });

    res.json({ attendance });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    const attendance = await Attendance.find({
      student: req.params.studentId,
      date: { $gte: startDate, $lte: endDate }
    })
      .populate('student')
      .populate('class')
      .sort({ date: 1 });

    const stats = {
      total: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      leave: attendance.filter(a => a.status === 'leave').length,
      percentage: attendance.length > 0 ? ((attendance.filter(a => a.status === 'present').length / attendance.length) * 100).toFixed(2) : 0
    };

    res.json({ attendance, stats });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query;

    const attendance = await Attendance.find({
      class: req.params.classId,
      date: new Date(date as string)
    })
      .populate('student')
      .sort({ student: 1 });

    res.json({ attendance });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};