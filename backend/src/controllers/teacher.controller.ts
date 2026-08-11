import { Response } from 'express';
import Teacher from '../models/Teacher';
import User from '../models/User';
import { AuthRequest } from '../types';

export const getAllTeachers = async (req: AuthRequest, res: Response) => {
  try {
    const teachers = await Teacher.find()
      .populate('user')
      .populate('department');
    res.json({ teachers });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherById = async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user')
      .populate('department');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ teacher });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, password, specialization, department, qualifications, joiningDate } = req.body;

    // Create user
    const user = new User({ name, email, phone, password, role: 'teacher' });
    await user.save();

    // Create teacher
    const teacher = new Teacher({
      user: user._id,
      name,
      email,
      phone,
      specialization,
      department,
      qualifications,
      joiningDate
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeacher = async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user')
      .populate('department');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req: AuthRequest, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    await User.findByIdAndDelete(teacher.user);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};