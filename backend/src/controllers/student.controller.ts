import { Response } from 'express';
import Student from '../models/Student';
import User from '../models/User';
import { AuthRequest } from '../types';

export const getAllStudents = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const students = await Student.find()
      .populate('user')
      .populate('department')
      .populate('class')
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments();

    res.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req: AuthRequest, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user')
      .populate('department')
      .populate('class');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ student });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, password, dateOfBirth, gender, address, city, state, zipCode, parentName, parentPhone, department, class: classId, admissionDate, rollNumber, bloodGroup } = req.body;

    // Create user
    const user = new User({ name, email, phone, password, role: 'student' });
    await user.save();

    // Create student ID
    const studentId = `STU-${Date.now()}`;

    // Create student
    const student = new Student({
      studentId,
      user: user._id,
      name,
      dateOfBirth,
      gender,
      phone,
      email,
      address,
      city,
      state,
      zipCode,
      parentName,
      parentPhone,
      department,
      class: classId,
      admissionDate,
      rollNumber,
      bloodGroup
    });

    await student.save();

    res.status(201).json({
      message: 'Student created successfully',
      student: await student.populate(['user', 'department', 'class'])
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req: AuthRequest, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user')
      .populate('department')
      .populate('class');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req: AuthRequest, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete associated user
    await User.findByIdAndDelete(student.user);

    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const searchStudents = async (req: AuthRequest, res: Response) => {
  try {
    const { query, department, class: classId } = req.query;

    let filter: any = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { studentId: { $regex: query, $options: 'i' } }
      ];
    }

    if (department) filter.department = department;
    if (classId) filter.class = classId;

    const students = await Student.find(filter)
      .populate('user')
      .populate('department')
      .populate('class');

    res.json({ students });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};