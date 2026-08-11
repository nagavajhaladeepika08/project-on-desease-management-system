import { Response } from 'express';
import Subject from '../models/Subject';
import { AuthRequest } from '../types';

export const getAllSubjects = async (req: AuthRequest, res: Response) => {
  try {
    const subjects = await Subject.find().populate('department');
    res.json({ subjects });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubjectById = async (req: AuthRequest, res: Response) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('department');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ subject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubject = async (req: AuthRequest, res: Response) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubject = async (req: AuthRequest, res: Response) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('department');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject updated successfully', subject });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSubject = async (req: AuthRequest, res: Response) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};