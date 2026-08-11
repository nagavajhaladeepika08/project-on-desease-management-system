import { Response } from 'express';
import Fee from '../models/Fee';
import { AuthRequest } from '../types';

export const getFeeByStudent = async (req: AuthRequest, res: Response) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId })
      .populate('student')
      .sort({ dueDate: -1 });

    const stats = {
      total: fees.length,
      pending: fees.filter(f => f.status === 'pending').length,
      paid: fees.filter(f => f.status === 'paid').length,
      overdue: fees.filter(f => f.status === 'overdue').length,
      pendingAmount: fees
        .filter(f => f.status === 'pending' || f.status === 'overdue')
        .reduce((sum, f) => sum + f.amount, 0)
    };

    res.json({ fees, stats });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addFee = async (req: AuthRequest, res: Response) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json({ message: 'Fee added successfully', fee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFee = async (req: AuthRequest, res: Response) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('student');
    if (!fee) {
      return res.status(404).json({ message: 'Fee not found' });
    }
    res.json({ message: 'Fee updated successfully', fee });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeeByStatus = async (req: AuthRequest, res: Response) => {
  try {
    const fees = await Fee.find({ status: req.params.status })
      .populate('student')
      .sort({ dueDate: -1 });

    res.json({ fees });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};