import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacherDocument extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  department: mongoose.Types.ObjectId;
  qualifications: string[];
  joiningDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<ITeacherDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    qualifications: [{
      type: String
    }],
    joiningDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

teacherSchema.index({ email: 1 });
teacherSchema.index({ department: 1 });

export default mongoose.model<ITeacherDocument>('Teacher', teacherSchema);