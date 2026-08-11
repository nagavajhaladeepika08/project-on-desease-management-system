import { Response } from 'express';
import Class from '../models/Class';
import { AuthRequest } from '../types';

export const getAllClasses = async (req: AuthRequest, res: Response) => {
  try {
    const classes = await Class.find()
      .populate('department')
      .populate('classTeacher');
    res.json({ classes });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassById = async (req: AuthRequest, res: Response) => {
  try {
    const classDoc = await Class.findById(req.params.id)
      .populate('department')
      .populate('classTeacher');
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ class: classDoc });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const classDoc = new Class(req.body);
    await classDoc.save();
    res.status(201).json({ message: 'Class created successfully', class: classDoc });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req: AuthRequest, res: Response) => {
  try {
    const classDoc = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('department')
      .populate('classTeacher');
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class updated successfully', class: classDoc });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req: AuthRequest, res: Response) => {
  try {
    const classDoc = await Class.findByIdAndDelete(req.params.id);
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};