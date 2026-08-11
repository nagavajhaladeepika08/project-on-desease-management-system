export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStudent {
  _id?: string;
  studentId: string;
  user: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  parentName: string;
  parentPhone: string;
  department: string;
  class: string;
  admissionDate: Date;
  rollNumber: string;
  bloodGroup: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeacher {
  _id?: string;
  user: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  qualifications: string[];
  joiningDate: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClass {
  _id?: string;
  className: string;
  classCode: string;
  department: string;
  classTeacher: string;
  academicYear: string;
  section: string;
  totalStudents: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDepartment {
  _id?: string;
  departmentName: string;
  departmentCode: string;
  headOfDepartment: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubject {
  _id?: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  credits: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAttendance {
  _id?: string;
  student: string;
  class: string;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMarks {
  _id?: string;
  student: string;
  subject: string;
  exam: string;
  marks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFee {
  _id?: string;
  student: string;
  amount: number;
  feeType: string;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  paymentMethod?: string;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Express.Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
