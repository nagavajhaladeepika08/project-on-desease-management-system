import { Response } from 'express';
import Marks from '../models/Marks';
import { AuthRequest } from '../types';

const getGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 30) return 'D';
  return 'F';
};

export const addMarks = async (req: AuthRequest, res: Response) => {
  try {
    const { student, subject, exam, marks, totalMarks } = req.body;

    const percentage = (marks / totalMarks) * 100;
    const grade = getGrade(percentage);

    const marksDoc = new Marks({
      student,
      subject,
      exam,
      marks,
      totalMarks,
      percentage: Math.round(percentage * 100) / 100,
      grade
    });

    await marksDoc.save();
    res.status(201).json({ message: 'Marks added successfully', marks: marksDoc });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarksByStudent = async (req: AuthRequest, res: Response) => {
  try {
    const marks = await Marks.find({ student: req.params.studentId })
      .populate('student')
      .populate('subject')
      .sort({ createdAt: -1 });

    res.json({ marks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMarks = async (req: AuthRequest, res: Response) => {
  try {
    const { marks, totalMarks } = req.body;

    const percentage = (marks / totalMarks) * 100;
    const grade = getGrade(percentage);

    const marksDoc = await Marks.findByIdAndUpdate(
      req.params.id,
      { marks, totalMarks, percentage: Math.round(percentage * 100) / 100, grade },
      { new: true }
    )
      .populate('student')
      .populate('subject');

    if (!marksDoc) {
      return res.status(404).json({ message: 'Marks not found' });
    }

    res.json({ message: 'Marks updated successfully', marks: marksDoc });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarksByExam = async (req: AuthRequest, res: Response) => {
  try {
    const marks = await Marks.find({ exam: req.params.exam })
      .populate('student')
      .populate('subject');

    res.json({ marks });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};