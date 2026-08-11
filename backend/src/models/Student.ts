import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentDocument extends Document {
  studentId: string;
  user: mongoose.Types.ObjectId;
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
  department: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  admissionDate: Date;
  rollNumber: string;
  bloodGroup: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudentDocument>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    parentName: {
      type: String,
      required: true
    },
    parentPhone: {
      type: String,
      required: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    admissionDate: {
      type: Date,
      required: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      default: null
    }
  },
  { timestamps: true }
);

// Create index for faster queries
studentSchema.index({ email: 1 });
studentSchema.index({ studentId: 1 });
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ department: 1, class: 1 });

export default mongoose.model<IStudentDocument>('Student', studentSchema);
